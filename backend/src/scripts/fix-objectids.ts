import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import mongoose from 'mongoose'

interface FeedbackRecord {
  _id?: { $oid: string }
  [key: string]: any
}

function generateUniqueObjectId(): string {
  return new mongoose.Types.ObjectId().toString()
}

function fixObjectIds(inputPath: string, outputPath?: string): void {
  try {
    // Read the JSON file
    const fileContent = readFileSync(inputPath, 'utf-8')
    
    if (!fileContent.trim()) {
      console.error('Error: JSON file is empty')
      process.exit(1)
    }

    const data: FeedbackRecord[] = JSON.parse(fileContent)

    if (!Array.isArray(data)) {
      console.error('Error: JSON file must contain an array of records')
      process.exit(1)
    }

    // Track used IDs to ensure uniqueness
    const usedIds = new Set<string>()

    // Update each record with a unique ObjectId
    const updatedData = data.map((record, index) => {
      let newId: string

      // Generate a unique ObjectId
      do {
        newId = generateUniqueObjectId()
      } while (usedIds.has(newId))

      usedIds.add(newId)

      return {
        ...record,
        _id: { $oid: newId }
      }
    })

    // Write the updated data
    const output = outputPath || inputPath
    writeFileSync(output, JSON.stringify(updatedData, null, 2), 'utf-8')

    console.log(`✅ Successfully updated ${updatedData.length} records`)
    console.log(`📁 Output file: ${output}`)
    console.log(`🔑 Generated ${usedIds.size} unique ObjectIds`)
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Error: Invalid JSON format in file')
    } else if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    } else {
      console.error('Error: An unknown error occurred')
    }
    process.exit(1)
  }
}

// Get command line arguments
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log('Usage: tsx fix-objectids.ts <input-file> [output-file]')
  console.log('Example: tsx fix-objectids.ts ../performancesnap_feedbacks_last_year.json')
  process.exit(1)
}

const inputPath = join(__dirname, args[0])
const outputPath = args[1] ? join(__dirname, args[1]) : undefined

fixObjectIds(inputPath, outputPath)
