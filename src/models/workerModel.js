


export default function WorkerModel(nom, prenom, email, telephone, fonction, apte,
                                    pays, region, ville, codePostal, photo_profil){
        this.nom=nom;
        this.prenom=prenom;
        this.email=email;
        this.telephone=telephone;
        this.adresse={
            ville:ville,
            region:region,
            pays:pays,
            codePostal:codePostal
        }
        this.information_employes={
            fonction:fonction
        }
        this.fonction=prenom;
        this.prenom=prenom;
        this.prenom=prenom;

}
