#   Output file path
$outputFile = "code_consolidated_output.txt"

#   Clear the output file
Clear-Content $outputFile

#   Function to process a single file
function Process-File {
    param(
        [string]$filePath
    )

    Write-Host "Processing file: $filePath"

    Add-Content -Path $outputFile -Value ""
    Add-Content -Path $outputFile -Value "============================================"
    Add-Content -Path $outputFile -Value "File: $filePath"
    Add-Content -Path $outputFile -Value "============================================"
    try {
        Get-Content -Path $filePath -Raw | Add-Content -Path $outputFile
    }
    catch {
        Add-Content -Path $outputFile -Value "ERROR processing $filePath"
    }
    Add-Content -Path $outputFile -Value ""
}

#   Process individual files
Process-File -filePath "C:\Projects.Study\LaptopMall\package.json"
Process-File -filePath "C:\Projects.Study\LaptopMall\.env"

#   Process files in directories
$foldersToProcess = "C:\Projects.Study\LaptopMall\.githooks", `
                    "C:\Projects.Study\LaptopMall\.github", `
                    "C:\Projects.Study\LaptopMall\docs", `
                    "C:\Projects.Study\LaptopMall\public", `
                    "C:\Projects.Study\LaptopMall\server", `
                    "C:\Projects.Study\LaptopMall\src"

foreach ($folder in $foldersToProcess) {
    Write-Host "Processing folder: $folder"
    
    # Use Get-ChildItem with -Force and -Recurse to include hidden files/folders
    $files = Get-ChildItem -Path $folder -Recurse -File -Force

    foreach ($file in $files) {
        # Exclude image files dynamically
        if ($file.Extension -notin @(".gif", ".png", ".ico", ".jpg")) {
            Process-File -filePath $file.FullName
        }
    }
}

#   Pause (optional)
Write-Host "Script completed. Press Enter to exit."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null










