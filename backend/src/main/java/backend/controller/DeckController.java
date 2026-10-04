package backend.controller;

import backend.model.Deck;
import backend.repository.DeckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:3000"})
@RequestMapping("/decks")
public class DeckController {

    @Autowired
    private DeckRepository deckRepository;

    @GetMapping
    public List<Deck> getAllDecks() {
        return deckRepository.findAll();
    }

    @PostMapping
    public Deck createDeck(@RequestBody Deck deck) {
        return deckRepository.save(deck);
    }
}