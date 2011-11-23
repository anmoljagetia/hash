bookmarklet:
	@echo -n "(function () {" | cat - packages/sjcl/sjcl.js src/bookmark.js > bookmarklet.js && \
	echo "}());" >> bookmarklet.js && \
	java -jar packages/yui/yuicompressor-2.4.7.jar -o bookmarklet.js bookmarklet.js

compile:
	@coffee -c src/*.coffee && echo "done."
