import { Component } from '@angular/core';
import { CHARACTERS, Character } from './characters';

@Component({
  selector: 'app-team-randomizer',
  templateUrl: './team-randomizer.component.html',
  styleUrls: ['./team-randomizer.component.css']
})
export class TeamRandomizerComponent {

  characters: Character[] = CHARACTERS;
  maxCost: number = 50; // Default costo massimo
  team: Character[] = [];
  maxTeamSize: number = 5;
  includeGiants: boolean = true; // Permette all'utente di scegliere se includere giganti

  constructor() {}

  randomizeTeam() {
    // Filtra i personaggi in base alla scelta dell'utente riguardo ai giganti
    let filteredCharacters = this.characters.filter(character => 
      (this.includeGiants || !character.isGiant) && character.cost <= this.maxCost);

    // Variabili per tenere traccia del miglior team trovato
    let bestTeam: Character[] = [];
    let highestCost = 0;
    const maxAttempts = 100;

    // Ciclo di tentativi per trovare il team con il costo massimo possibile
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const generatedTeam = this.generateRandomTeam(filteredCharacters, this.maxCost);
      const teamCost = generatedTeam.reduce((sum, c) => sum + c.cost, 0);

      // Aggiorna il miglior team trovato se il costo è maggiore ma non supera il maxCost
      if (teamCost > highestCost && teamCost <= this.maxCost) {
        bestTeam = generatedTeam;
        highestCost = teamCost;
      }

      // Se troviamo un team esattamente uguale al maxCost, possiamo terminare subito
      if (teamCost === this.maxCost) {
        this.team = generatedTeam;
        return;
      }
    }

    // Al termine dei tentativi, assegna il miglior team trovato
    this.team = bestTeam;
  }

  generateRandomTeam(availableCharacters: Character[], targetCost: number): Character[] {
    let team: Character[] = [];
    let remainingCost = targetCost;
    let transformationGroupsInTeam = new Set<string>();

    // Mischia i personaggi per una selezione casuale
    const shuffledCharacters = this.shuffleArray([...availableCharacters]);

    for (let character of shuffledCharacters) {
      if (team.length >= this.maxTeamSize) break; // Raggiunto numero massimo di personaggi

      // Ignora il personaggio se è dello stesso gruppo di trasformazione di uno già nel team
      if (character.transformationGroup && transformationGroupsInTeam.has(character.transformationGroup)) {
        continue;
      }

      // Aggiungi il personaggio solo se il costo non supera il budget residuo
      if (character.cost <= remainingCost) {
        team.push(character);
        remainingCost -= character.cost;

        // Registra il gruppo di trasformazione
        if (character.transformationGroup) {
          transformationGroupsInTeam.add(character.transformationGroup);
        }
      }
    }

    return team;
  }

  // Funzione per mischiare l'array (Fisher-Yates shuffle)
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
