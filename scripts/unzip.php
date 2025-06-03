<?php
$zipFile = 'site.zip'; // The uploaded ZIP file
$extractTo = '.'; // Extract in public_html

if (!file_exists($zipFile)) {
    die("Zip file not found");
}

$zip = new ZipArchive;
if ($zip->open($zipFile) === TRUE) {
    $zip->extractTo($extractTo);
    $zip->close();
    echo 'Extraction complete.';
} else {
    echo 'Failed to extract.';
}
?>
