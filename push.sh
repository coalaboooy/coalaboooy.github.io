DATE=$(date +"%F %T")
git add *
git commit -m "auto push at $DATE"
git push origin main