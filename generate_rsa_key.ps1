$RSAKey = openssl genrsa 2048 | Out-String
$Base64Key = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($RSAKey))
Add-Content -Path .env -Value "LAGO_RSA_PRIVATE_KEY=$Base64Key"
