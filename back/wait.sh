#!/bin/sh

while ! nc -z db 5432 ; do
	sleep 0.5
done

echo "[+] Successfully reached database"

exit 0;

