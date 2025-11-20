.PHONY: help test test-v run build clean fmt vet install deps tidy cover open clean-output

help: ## Afficher cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

test: ## Lancer les tests
	go test

test-v: ## Lancer les tests en mode verbeux
	go test -v

run: ## Exécuter le programme
	go run .

build: ## Compiler le programme
	go build -o bin/app

clean: ## Nettoyer les fichiers compilés
	go clean
	rm -rf bin/

fmt: ## Formater le code
	go fmt ./...

vet: ## Analyser le code
	go vet ./...

check: fmt vet test ## Formater, analyser et tester

install: ## Installer les dépendances
	go mod download

deps: ## Afficher les dépendances
	go list -m all

tidy: ## Nettoyer les dépendances
	go mod tidy

cover: ## Générer un rapport de couverture
	go test -coverprofile=coverage.out
	go tool cover -html=coverage.out -o coverage.html
	@echo "Rapport de couverture généré dans coverage.html"

open: run ## Exécuter et ouvrir le HTML dans le navigateur
	open output.html

clean-output: ## Supprimer les fichiers de sortie
	rm -f output.html coverage.out coverage.html
