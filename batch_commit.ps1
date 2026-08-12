git reset HEAD

$status = git status --porcelain
$files = @()
foreach ($line in $status) {
    if ($line.Trim() -ne "") {
        # get everything from index 3 onwards
        $filePath = $line.Substring(3).Trim('"')
        
        # if it's a rename (e.g. 'a -> b'), we need to add both
        if ($filePath -match " -> ") {
            $parts = $filePath -split " -> "
            $files += $parts[0]
            $files += $parts[1]
        } else {
            $files += $filePath
        }
    }
}
$files = $files | Select-Object -Unique

# Batch commit loop
for ($i = 0; $i -lt $files.Count; $i += 3) {
    $batch = $files | Select-Object -Skip $i -First 3
    if ($batch) {
        foreach ($file in $batch) {
            git add $file
        }
        $batchNum = [math]::Floor($i/3) + 1
        git commit -m "Restructure batch $batchNum"
    }
}

git push origin main
