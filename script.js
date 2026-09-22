// liste eleves que jai mis du temps a ecrire 

const eleves = [
    "Lylia.FS",
    "Mickaëla.G",
    "Hicham.M",
    "Benoît.F",
    "Emie.G",
    "Ansaier.A",
    "Jovanie.T",
    "Chemsedine.B",
    "Kilian.G",
    "Renack.B",
    "Romain.LH",
    "Romain.LE",
    "Oualid.O",
    "Quentin.G",
    "Mansoibou.B",
    "Anael.S",
    "Sonia.L",
    "Dylan.P",
    "Wilem.G",
    "Guillaume.X",
    "Antoine.J",
    "Thibault.D",
    "Susan.M",
    "Eric.M",
    "Orphé.C",
    "Logan.D",
    "Guihlem.B",
    "Tristant.V",
    "Nicolas.G",
    "Ethan.C",
    "Abdelilah.El-H",
    "Helvy.H"
];

const nombreElevesClasse = eleves.length;


// recup html elements

const listeEleves =
    document.getElementById("liste-eleves");

const nombrePresents =
    document.getElementById("nombre-presents");

const nombrePresentsEtape2 =
    document.getElementById("nombre-presents-etape2");


const boutonToutSelectionner =
    document.getElementById("tout-selectionner");

const boutonToutDeselectionner =
    document.getElementById("tout-deselectionner");


const inputNouveauParticipant =
    document.getElementById("nouveau-participant");

const boutonAjouterParticipant =
    document.getElementById("ajouter-participant");


const boutonSuivant =
    document.getElementById("bouton-suivant");

const boutonRetour =
    document.getElementById("bouton-retour");


const etapePresences =
    document.getElementById("etape-presences");

const etapeGroupes =
    document.getElementById("etape-groupes");


const tailleGroupe =
    document.getElementById("taille-groupe");

const boutonDiminuer =
    document.getElementById("diminuer-taille");

const boutonAugmenter =
    document.getElementById("augmenter-taille");


const boutonGenerer =
    document.getElementById("generer-groupes");

const boutonRefaire =
    document.getElementById("refaire-tirage");

const boutonCopier =
    document.getElementById("copier-groupes");


const listeGroupes =
    document.getElementById("liste-groupes");

const zoneResultats =
    document.getElementById("zone-resultats");


// param

let nombreParGroupe = 3;


// affiche eleves 

function afficherEleves() {

    listeEleves.innerHTML = "";

    eleves.forEach((eleve, index) => {

        const div = document.createElement("div");
        div.classList.add("eleve");

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.id = `eleve-${index}`;

        const label = document.createElement("label");

        label.htmlFor = `eleve-${index}`;
        label.textContent = eleve;

        checkbox.addEventListener(
            "change",
            mettreAJourCompteur
        );

        div.appendChild(checkbox);
        div.appendChild(label);


        // Participant ajouté manuellement
        if (index >= nombreElevesClasse) {

            const boutonSupprimer =
                document.createElement("button");

            boutonSupprimer.textContent = "×";

            boutonSupprimer.classList.add(
                "supprimer-participant"
            );

            boutonSupprimer.title =
                "Supprimer ce participant";

            boutonSupprimer.addEventListener(
                "click",
                () => {

                    eleves.splice(index, 1);

                    afficherEleves();

                }
            );

            div.appendChild(boutonSupprimer);
        }


        listeEleves.appendChild(div);
    });


    mettreAJourCompteur();
}


// compteur de presents

function mettreAJourCompteur() {

    const coches =
        document.querySelectorAll(
            "#liste-eleves input[type='checkbox']:checked"
        );

    nombrePresents.textContent =
        coches.length;
}


// selec 

boutonToutSelectionner.addEventListener(
    "click",
    () => {

        const checkboxes =
            document.querySelectorAll(
                "#liste-eleves input[type='checkbox']"
            );

        checkboxes.forEach(checkbox => {

            checkbox.checked = true;

        });

        mettreAJourCompteur();

    }
);


// deselec

boutonToutDeselectionner.addEventListener(
    "click",
    () => {

        const checkboxes =
            document.querySelectorAll(
                "#liste-eleves input[type='checkbox']"
            );

        checkboxes.forEach(checkbox => {

            checkbox.checked = false;

        });

        mettreAJourCompteur();

    }
);


// ajoute participant si besoin 

function ajouterParticipant() {

    const prenom = inputNouveauParticipant.value.trim();

    if (prenom === "") {
        return;
    }

    // es ce que elle existe deja ???? bonne question 
    const existeDeja = eleves.some(
        eleve => eleve.toLowerCase() === prenom.toLowerCase()
    );

    if (existeDeja) {
        alert("Ce participant est déjà dans la liste.");
        return;
    }

    eleves.push(prenom);

    inputNouveauParticipant.value = "";

    afficherEleves();
}


boutonAjouterParticipant.addEventListener(
    "click",
    ajouterParticipant
);


// permet d'appuyer sur entrée

inputNouveauParticipant.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            ajouterParticipant();

        }

    }
);


// recup les presents 

function recupererPresents() {

    const presents = [];


    const checkboxes =
        document.querySelectorAll(
            "#liste-eleves input[type='checkbox']"
        );


    checkboxes.forEach(
        (checkbox, index) => {

            if (checkbox.checked) {

                presents.push(
                    eleves[index]
                );

            }

        }
    );


    return presents;
}


// bouton suivant pour passer a l'etape 2

boutonSuivant.addEventListener(
    "click",
    () => {

        const presents =
            recupererPresents();


        if (presents.length < 2) {

            alert(
                "Sélectionne au moins 2 participants."
            );

            return;
        }


        nombrePresentsEtape2.textContent =
            presents.length;


        etapePresences.hidden = true;

        etapeGroupes.hidden = false;


        // on remonte en haut de page

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// retour au presences etp1

boutonRetour.addEventListener(
    "click",
    () => {

        etapeGroupes.hidden = true;

        etapePresences.hidden = false;


        zoneResultats.hidden = true;


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// taille des groupes

boutonAugmenter.addEventListener(
    "click",
    () => {

        const presents =
            recupererPresents();


        if (
            nombreParGroupe
            <
            presents.length
        ) {

            nombreParGroupe++;

            tailleGroupe.textContent =
                nombreParGroupe;

        }

    }
);


boutonDiminuer.addEventListener(
    "click",
    () => {

        if (nombreParGroupe > 2) {

            nombreParGroupe--;

            tailleGroupe.textContent =
                nombreParGroupe;

        }

    }
);


// melanges aeloire avec l'algorithme de Fisher-Yates


function melanger(tableau) {

    const copie = [...tableau];


    for (
        let i = copie.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            copie[i],
            copie[j]
        ] = [
                copie[j],
                copie[i]
            ];

    }


    return copie;
}


// crrer groupe equilibres 

function creerGroupesEquilibres(
    personnes,
    tailleSouhaitee
) {

    const nombrePersonnes =
        personnes.length;

// on calcul ya qui pour savoir combien de groupe on fais et si plus dans 1 groupe ou non 


    const nombreGroupes =
        Math.max(
            1,
            Math.round(
                nombrePersonnes
                /
                tailleSouhaitee
            )
        );


    const groupes =
        Array.from(
            {
                length: nombreGroupes
            },
            () => []
        );


    personnes.forEach(
        (personne, index) => {

            const numeroGroupe =
                index % nombreGroupes;


            groupes[
                numeroGroupe
            ].push(personne);

        }
    );


    return groupes;
}


// générer groupes

function genererGroupes() {

    const presents =
        recupererPresents();


    if (presents.length < 2) {

        alert(
            "Sélectionne au moins 2 participants."
        );

        return;
    }


    const personnesMelangees =
        melanger(presents);


    const groupes =
        creerGroupesEquilibres(
            personnesMelangees,
            nombreParGroupe
        );


    afficherGroupes(groupes);


    zoneResultats.hidden = false;

}


// affichages des groupes

function afficherGroupes(groupes) {

    listeGroupes.innerHTML = "";


    groupes.forEach(
        (groupe, index) => {

            const carte =
                document.createElement("div");


            carte.classList.add(
                "groupe"
            );


            const titre =
                document.createElement("h3");


            titre.textContent =
                `Groupe ${index + 1}`;


            carte.appendChild(
                titre
            );


            const compteur =
                document.createElement("span");


            compteur.classList.add(
                "nombre-groupe"
            );


            compteur.textContent =
                `${groupe.length} personnes`;


            carte.appendChild(
                compteur
            );


            groupe.forEach(
                personne => {

                    const nom =
                        document.createElement("p");


                    nom.textContent =
                        personne;


                    carte.appendChild(
                        nom
                    );

                }
            );


            listeGroupes.appendChild(
                carte
            );

        }
    );

}


// tirage des groupes

boutonGenerer.addEventListener(
    "click",
    genererGroupes
);


boutonRefaire.addEventListener(
    "click",
    genererGroupes
);


// copier groupes

boutonCopier.addEventListener(
    "click",
    async () => {

        const groupes =
            document.querySelectorAll(
                ".groupe"
            );


        if (groupes.length === 0) {

            alert(
                "Génère d'abord les groupes."
            );

            return;
        }


        let texte = "";


        groupes.forEach(
            (groupe, index) => {

                texte +=
                    `Groupe ${index + 1}\n`;


                const personnes =
                    groupe.querySelectorAll(
                        "p"
                    );


                personnes.forEach(
                    personne => {

                        texte +=
                            `- ${personne.textContent}\n`;

                    }
                );


                texte += "\n";

            }
        );


        try {

            await navigator.clipboard.writeText(
                texte
            );


            alert(
                "Groupes copiés hehe !"
            );

        }

        catch (erreur) {

            alert(
                "Impossible de copier automatiquement les groupes."
            );

        }

    }
);


// on lance 

afficherEleves();