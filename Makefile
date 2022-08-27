.PHONY: dbinit

dbinit:
	sqlite3 ./database/simple-blog.sqlite ".read ./database/init/db.sql "
