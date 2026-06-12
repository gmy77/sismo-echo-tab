# Genera le icone dell'estensione SISMO ECHO Tab (16/48/128 px)
Add-Type -AssemblyName System.Drawing

function New-EchoIcon([int]$size, [string]$path) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'

  # sfondo scuro arrotondato
  $bg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 8, 14, 20))
  $r = [int]($size * 0.22)
  $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
  $gp.AddArc(0, 0, 2*$r, 2*$r, 180, 90)
  $gp.AddArc($size-2*$r, 0, 2*$r, 2*$r, 270, 90)
  $gp.AddArc($size-2*$r, $size-2*$r, 2*$r, 2*$r, 0, 90)
  $gp.AddArc(0, $size-2*$r, 2*$r, 2*$r, 90, 90)
  $gp.CloseFigure()
  $g.FillPath($bg, $gp)

  # tracciato sismografico cyan
  $penW = [single][Math]::Max(1.5, $size / 18)
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 38, 198, 218), $penW)
  $pen.LineJoin = 'Round'; $pen.StartCap = 'Round'; $pen.EndCap = 'Round'

  $s = [single]$size
  $m = [single]($s / 2)
  $pts = New-Object 'System.Drawing.PointF[]' 7
  $pts[0] = New-Object System.Drawing.PointF(($s*0.12), $m)
  $pts[1] = New-Object System.Drawing.PointF(($s*0.30), $m)
  $pts[2] = New-Object System.Drawing.PointF(($s*0.38), ($s*0.30))
  $pts[3] = New-Object System.Drawing.PointF(($s*0.50), ($s*0.74))
  $pts[4] = New-Object System.Drawing.PointF(($s*0.60), ($s*0.22))
  $pts[5] = New-Object System.Drawing.PointF(($s*0.68), $m)
  $pts[6] = New-Object System.Drawing.PointF(($s*0.88), $m)
  $g.DrawLines($pen, $pts)

  # punto magenta sul picco (Campi Flegrei)
  if ($size -ge 48) {
    $dot = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 224, 64, 251))
    $dw = [single]($s * 0.10)
    $g.FillEllipse($dot, ($s*0.60 - $dw/2), ($s*0.22 - $dw/2), $dw, $dw)
  }

  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host ("creata: " + $path)
}

$base = Join-Path $PSScriptRoot 'icons'
New-EchoIcon 128 (Join-Path $base 'icon128.png')
New-EchoIcon 48  (Join-Path $base 'icon48.png')
New-EchoIcon 16  (Join-Path $base 'icon16.png')
