#!/bin/sh

while ! nc -z db 5432 ; do
	sleep 0.5
done

echo "[+] Successfully reached database"
sleep 1

exit 0;

