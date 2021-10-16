rm -rf ./dist/
mkdir ./dist/
find . -name '.DS_Store' -type f -delete 
zip -r ./dist/wholesome-footnotes.zip ./ -x ./node_modules\*  ./dist\* ./.git\*