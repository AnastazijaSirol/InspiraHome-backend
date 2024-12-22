# Specifikacija backend-a

## 1. POST /api/signup
Registracija novog korisnika
### Ulazni podaci:
- usename
- email
- password

### Izlaz:
- Uspješno: `res.status(201).send('User registered successfully.');`
- Neuspješno: `res.status(500).send('Error registering user.');`

## 2. POST /api/login
Prijava novog korisnika
### Ulazni podaci:
- email
- password

### Izlaz:
- Uspješno: `res.status(200).send({ auth: true, token });`
- Neuspješno: `res.status(500).send('Error logging in.');`

## 3. POST /api/history
Dodavanje povijesti pretraživanja
### Ulazni podaci:
- style
- room
- color

### Izlaz:
- Uspješno: `res.status(201).send('History record saved.');`
- Neuspješno: `res.status(500).send('Error saving history.');`

## 4. POST /api/images
Generiranje slike na temelju prompta korisnika
### Ulazni podaci:
- koristi posljednji zapis u povijesti pretraživanja korisnika

### Izlaz:
- Uspješno: `res.json({ image: imageUrl, prompt });`
- Neuspješno: `return res.status(500).json({ error: 'Failed to generate image.' });`

## 5. GET /api/profile
Dohvaćanje korisničkog računa
### Izlaz:
- Uspješno: 
`res.status(200).json({ `
`username: user.username,`
`email: user.email,`
`isDesigner: user.isDesigner`
`});`
- Neuspješno: `res.status(500).send('Error fetching user profile.');`

## 6. PUT /api/profile
Ažuriranje username-a
### Ulazni podaci:
- username

### Izlaz:
- Uspješno: `res.status(200).send('Username updated successfully.');`
- Neuspješno: `res.status(500).send('Failed to update username.');`

## 7. PUT /api/profile/designer
Postavljanje korisnika kao designer-a
### Izlaz:
- Uspješno: `res.status(200).send('User is now a designer.');`
- Neuspješno: `res.status(500).send('Error updating designer status.');`

## 8. POST /api/likes
Dodavanje slika u like-ane
### Ulazni podaci:
- imageUrl

### Izlaz:
- Uspješno: `res.status(201).json({ success: true, like });`
- Neuspješno: `res.status(500).json({ success: false, error: 'Failed to save like.' });`

## 9. GET /api/likes
Dohvaćanje like-anih slika
### Izlaz:
- Uspješno: `res.status(200).json(likes);`
- Neuspješno: `res.status(500).send('Failed to fetch liked images.');`

## 10. DELETE /api/likes/:id
Brisanje like-ane slike prema id-u
### Ulazni podaci:
- likeId

### Izlaz:
- Uspješno: `res.status(200).json({ success: true, message: 'Like removed successfully.' });`
- Neuspješno: `res.status(500).json({ success: false, error: 'Failed to remove like.' });`

## 11. GET /api/history
Dohvaćanje povijesti pretraživanja
### Izlaz:
- Uspješno: `res.status(200).json(history);`
- Neuspješno: `res.status(500).send('Error fetching search history.');`

## 12. DELETE /api/history/:dateTime
Brisanje povijesti pretraživanja prema dateTime-u
### Ulazni podaci:
- dateTime

### Izlaz:
- Uspješno: `res.status(200).send('History entry deleted successfully.');`
- Neuspješno: `res.status(500).send('Error deleting history entry.');`

## 13. POST /api/groups
Dodavanje grupnih chatova
### Ulazni podaci:
- name

### Izlaz:
- Uspješno: `res.status(201).json(group);`
- Neuspješno: `res.status(500).send('Error creating group.');`

## 14. GET /api/groups
Dohvaćanje grupnih chatova
### Izlaz:
- Uspješno: `res.status(200).json(groups);`
- Neuspješno: `res.status(500).send('Error fetching groups.');`

## 15. POST /api/groups/:groupId/messages
Dodavanje poruke u grupni chat prema id-u grupnog chata
### Ulazni podaci:
- text
- groupId

### Izlaz:
- Uspješno: `res.status(201).json(message);`
- Neuspješno: `res.status(500).send('Error adding message.');`

## 16. GET /api/groups/:groupId/messages
Dohvaćanje poruka u grupnom chat-u prema id-u grupnog chat-a
### Ulazni podaci:
- groupId

### Izlaz:
- Uspješno: `res.status(200).json(messages);`
- Neuspješno: `res.status(500).send('Error fetching messages.');`

## 17. POST /api/upload
Upload-anje slike
### Ulazni podaci:
- file
- filename

### Izlaz:
- Uspješno: `res.status(201).json({ success: true, imageUrl, added });`
- Neuspješno: `res.status(500).json({ error: 'Failed to upload file.' });`

## 18. GET /api/uploaded-images
Dohvaćanje upload-anih slika
### Ulazni podaci:
- userId

### Izlaz:
- Uspješno: `res.status(200).json(images);`
- Neuspješno: `res.status(500).json({ error: 'Failed to fetch user images.' });`

## 19. GET /api/designers
Dohvaćanje desginer-a
### Izlaz:
- Uspješno: `res.status(200).json(designers);`
- Neuspješno: `res.status(500).send('Error fetching designers.');`

## 20. GET /api/images/:designerId
Dohvaćanje upload-anih slika prema id-u designera
### Ulazni podaci:
- designerId

### Izlaz:
- Uspješno: `res.status(200).json(images);`
- Neuspješno: `res.status(500).json({ error: "Failed to fetch designer images." });`

## 21. POST /api/save-quiz-result
Spremanje rezultata kviza
### Ulazni podaci:
- style

### Izlaz:
- Uspješno: `res.status(201).send("Quiz result saved successfully.");`
- Neuspješno: `res.status(500).send("Failed to save quiz result.");`

## 22. GET /api/get-quiz-result
Dohvaćanje rezultata kviza
### Izlaz:
- Uspješno: `res.status(200).json(results);`
- Neuspješno: `res.status(500).send("Failed to fetch quiz results.");`

## 23. POST /api/competitions
Pohrana natjecanja
### Ulazni podaci:
- name
- date
- image

### Izlaz:
- Uspješno: `res.status(201).json(newCompetition);`
- Neuspješno: `res.status(500).json({ message: "Internal server error." });`

## 24. GET /api/competitions
Dohvaćanje natjecanja
### Izlaz:
- Uspješno: `res.status(200).json(competitions);`
- Neuspješno: `res.status(500).json({ message: "Internal server error." });`

## 25. POST /api/competitions/:id/join
Pohrana natjecateljskih opisa slike
### Ulazni podaci:
- id
- userId
- description

### Izlaz:
- Uspješno: `res.status(201).json(newCompetitor);`
- Neuspješno: `res.status(500).json({ message: "Error joining competition" });`

## 26. GET /api/competitions/:competitionId/descriptions
Dohvaćanje natjecateljskih opisa slike
### Ulazni podaci:
- competitionId

### Izlaz:
- Uspješno: `res.status(200).json(descriptions);`
- Neuspješno: `res.status(500).json({ message: 'Failed to fetch descriptions.' });`

## 27. POST /api/competitions/:id/pick-winner
Proglašavanje pobjednika određenog natjecanja
### Ulazni podaci:
- id
- winner

### Izlaz:
- Uspješno: `res.status(200).json({ message: "Winner selected successfully" })`
- Neuspješno: `res.status(500).json({ message: "Internal server error." });`

## 28. GET /api/descriptions/:id
Dohvaćanje opisa probjednika
### Ulazni podaci:
- id

### Izlaz:
- Uspješno: `res.status(200).json(description);`
- Neuspješno: `res.status(500).json({ message: 'Internal server error' });`
