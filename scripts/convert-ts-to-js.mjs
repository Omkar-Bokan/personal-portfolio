// Usage in v0: open Scripts tab and run this script.
// It will:
//  - Create backups under scripts/backup-ts/<relative-path>
//  - Transform .ts -> .js, .tsx -> .jsx (including API routes like route.ts -> route.js)
//  - Strip types and preserve JSX using sucrase
//  - Skip node_modules, .next, scripts/, and user_read_only_context/

import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { transform } from "sucrase"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.resolve(__dirname, "..")
const BACKUP_ROOT = path.join(__dirname, "backup-ts")

const IGNORED_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "scripts",
  "user_read_only_context",
])

/**
 * Recursively list files under dir
 */
async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const results = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    // Skip ignored directories
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue
      results.push(...(await listFiles(full)))
      continue
    }
    results.push(full)
  }
  return results
}

/**
 * Decide output extension:
 *  - .tsx -> .jsx
 *  - .ts -> .js
 */
function getOutputPath(inputPath) {
  if (inputPath.endsWith(".tsx")) {
    return inputPath.slice(0, -4) + "jsx"
  }
  if (inputPath.endsWith(".ts")) {
    return inputPath.slice(0, -2) + "js"
  }
  return inputPath
}

/**
 * Convert a TS/TSX file to JS/JSX with Sucrase, backup original, write transformed, then delete original.
 */
async function convertFile(filePath) {
  const rel = path.relative(PROJECT_ROOT, filePath)
  // Skip type declaration files
  if (filePath.endsWith(".d.ts")) {
    console.log(`[v0] Skipping declarations: ${rel}`)
    return
  }

  if (!(filePath.endsWith(".ts") || filePath.endsWith(".tsx"))) {
    return
  }

  const outPath = getOutputPath(filePath)
  const outRel = path.relative(PROJECT_ROOT, outPath)

  const code = await fs.readFile(filePath, "utf8")

  // Transform: strip TS and keep JSX
  const { code: transformed } = transform(code, {
    transforms: ["typescript", "jsx"],
    // preserve JSX and modern syntax
    jsxRuntime: "automatic",
    keepUnusedImports: false,
    production: true,
  })

  // Ensure backup path exists
  const backupPath = path.join(BACKUP_ROOT, rel)
  await fs.mkdir(path.dirname(backupPath), { recursive: true })
  await fs.writeFile(backupPath, code, "utf8")

  // Write transformed file
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, transformed, "utf8")

  // Remove original
  await fs.unlink(filePath)

  console.log(`[v0] Converted ${rel} -> ${outRel} (backup: ${path.relative(PROJECT_ROOT, backupPath)})`)
}

async function main() {
  console.log("[v0] Starting TypeScript -> JavaScript conversion")
  console.log(`[v0] Project root: ${PROJECT_ROOT}`)
  console.log(`[v0] Backup dir: ${BACKUP_ROOT}`)

  const allFiles = await listFiles(PROJECT_ROOT)

  // Filter only TS/TSX
  const tsFiles = allFiles.filter((f) =>
    (f.endsWith(".ts") || f.endsWith(".tsx")) && !f.endsWith(".d.ts")
  )

  // Convert in sequence for clearer logs (can be parallelized if needed)
  for (const file of tsFiles) {
    try {
      await convertFile(file)
    } catch (err) {
      console.log(`[v0] Error converting ${path.relative(PROJECT_ROOT, file)}:`, err?.message || err)
    }
  }

  console.log("[v0] Conversion complete. Review changes and reload your preview.")
}

main().catch((err) => {
  console.error("[v0] Fatal error:", err)
  process.exit(1)
})
