#
# development commands
#
init:
	sh ./scripts/dev-init.sh

#
# development commands
#
dev:
	sh ./scripts/dev-start.sh

#
# development commands
#
destroy-dev:
	docker-compose -f docker-compose.proxy.yml down
	docker-compose -f docker-compose.development.yml down -v

#
# development commands
#
stop-dev:
	docker-compose -f docker-compose.development.yml stop

#
# dump DB commands
#
dump:
	sh ./scripts/wp-dump.sh
