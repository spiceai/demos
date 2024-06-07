.PHONY: all
all:
	@docker compose up -d

.PHONY: ftp
ftp:
	@docker compose up ftp

.PHONY: clean
clean:
	@docker compose down
	@docker volume prune -f
	@docker image prune -f
