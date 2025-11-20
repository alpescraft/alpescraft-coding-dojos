package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"os"
)

type Input struct {
	Quantity  int     `json:"quantity"`
	UnitPrice float64 `json:"unitPrice"`
	TaxRate   float64 `json:"taxRate"`
}

type Result struct {
	Quantity  int
	UnitPrice float64
	TaxRate   float64
	Total     string
}

func main() {
	// Lire le fichier JSON
	data, err := os.ReadFile("inputs.json")
	if err != nil {
		log.Fatalf("Erreur lors de la lecture du fichier inputs.json: %v", err)
	}

	// Parser le JSON
	var inputs []Input
	if err := json.Unmarshal(data, &inputs); err != nil {
		log.Fatalf("Erreur lors du parsing du JSON: %v", err)
	}

	// Calculer les résultats
	pc := &PriceCalculator{}
	var results []Result
	for _, input := range inputs {
		total := pc.Calculate(input.Quantity, input.UnitPrice, input.TaxRate)
		results = append(results, Result{
			Quantity:  input.Quantity,
			UnitPrice: input.UnitPrice,
			TaxRate:   input.TaxRate,
			Total:     total,
		})
	}

	// Générer le HTML
	htmlTemplate := `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Résultats du calcul de prix</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        tr:hover {
            background-color: #ddd;
        }
        .total {
            font-weight: bold;
            color: #4CAF50;
        }
    </style>
</head>
<body>
    <h1>Résultats du calcul de prix</h1>
    <table>
        <thead>
            <tr>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Taux de taxe</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {{range .}}
            <tr>
                <td>{{.Quantity}}</td>
                <td>{{printf "%.2f €" .UnitPrice}}</td>
                <td>{{printf "%.0f%%" .TaxRate}}</td>
                <td class="total">{{.Total}}</td>
            </tr>
            {{end}}
        </tbody>
    </table>
</body>
</html>
`

	// Créer le fichier HTML
	tmpl, err := template.New("output").Parse(htmlTemplate)
	if err != nil {
		log.Fatalf("Erreur lors de la création du template: %v", err)
	}

	outputFile, err := os.Create("output.html")
	if err != nil {
		log.Fatalf("Erreur lors de la création du fichier output.html: %v", err)
	}
	defer outputFile.Close()

	if err := tmpl.Execute(outputFile, results); err != nil {
		log.Fatalf("Erreur lors de l'écriture du HTML: %v", err)
	}

	fmt.Println("✓ Fichier output.html généré avec succès!")
	fmt.Printf("✓ %d calculs effectués\n", len(results))
}
