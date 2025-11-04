// Usage: Run this script from the v0 "Scripts" panel.
// It will:
// - Find all .tsx files (ignores node_modules, .next, user_read_only_context, .git)
// - Transform TypeScript/TSX to JavaScript
// - Write to .jsx (or .js for Next API route files at app/api/**/route.tsx)
// - Delete the original .tsx files
//
// Safety:
// - Prints each converted file
// - Skips already-converted files
// - If an error occurs for a file, it logs and continues

import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, "..")
const ignoreDirs = new Set(["node_modules", ".next", ".git", "user_read_only_context"])

async function* walk(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  for (const d of dirents) {
    const fullPath = path.join(dir, d.name)
    if (d.isDirectory()) {
      if (!ignoreDirs.has(d.name)) {
        yield* walk(fullPath)
      }
    } else if (d.isFile()) {
      yield fullPath
    }
  }
}

// Detect Next.js API route handler files to prefer .js over .jsx
function isApiRouteHandler(tsxPath) {
  // Matches app/api/**/route.tsx
  const normalized = tsxPath.replace(/\\/g, "/")
  return /\/app\/api\/.+\/route\.tsx$/.test(normalized)
}

async function convertTsxToJsx(filePath) {
  const source = await fs.readFile(filePath, "utf8")
  const { transform } = await import("@swc/core")

  const swcResult = await transform(source, {
    filename: filePath,
    // We keep JSX transform enabled to ensure valid output even if TS config is strict
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
        decorators: false,
        dynamicImport: true,
      },
      transform: {
        react: {
          runtime: "automatic",
          development: false,
          useBuiltins: true,
          refresh: false,
        },
      },
      target: "es2022",
    },
    minify: false,
    sourceMaps: false,
    module: {
      type: "es6",
    },
  })

  const outExt = isApiRouteHandler(filePath) ? ".js" : ".jsx"
  const outPath = filePath.replace(/\.tsx$/, outExt)

  await fs.writeFile(outPath, swcResult.code, "utf8")
  await fs.unlink(filePath)
  console.log(`[v0] Converted: ${path.relative(projectRoot, filePath)} -> ${path.relative(projectRoot, outPath)}`)
}

async function main() {
  let total = 0
  let converted = 0
  let errors = 0
  for await (const fp of walk(projectRoot)) {
    if (!fp.endsWith(".tsx")) continue
    // Skip if a corresponding .jsx already exists (idempotent)
    const outExt = isApiRouteHandler(fp) ? ".js" : ".jsx"
    const target = fp.replace(/\.tsx$/, outExt)
    total++
    try {
      // If already converted, skip
      const existsTarget = await fs
        .access(target)
        .then(() => true)
        .catch(() => false)
      if (existsTarget) {
        console.log(`[v0] Skipping (target exists): ${path.relative(projectRoot, target)}`)
        continue
      }
      await convertTsxToJsx(fp)
      converted++
    } catch (e) {
      errors++
      console.log(`[v0] Error converting ${path.relative(projectRoot, fp)}:`, e?.message || e)
    }
  }

  console.log(`[v0] Done. TSX scanned: ${total}, Converted: ${converted}, Errors: ${errors}`)
}

main().catch((e) => {
  console.log("[v0] Fatal error:", e?.message || e)
})
