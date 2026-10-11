import { useEffect, useState } from "react";
import api from "../utils/api";
import {toast} from 'react-toastify'
const Membre = () => {
  const [membres,setMembres] = useState([])
  const [Modifier,SetModifier] = useState(false)

  const [data, setData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    telephone: "",
    adresse: "",
  });
  useEffect(() => {
    AfficherMembre()
  },[])

  const AfficherMembre = async(e) => {
    try {
      const response = await api.get('/api/membres/obtenir',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('pos-token')}`
        }
      }
    )
    setMembres(response.data.membres)
    } catch (error) {
      console.error("Erreur de recuperation membre",error);
      
    }
  }

  function  modifer (membre)  {
    setData({
      nom: membre.nom,
      prenom: membre.prenom,
      email: membre.email,
      password: "",
      telephone: membre.telephone,
      adresse: membre.adresse
    })

    SetModifier(membre._id)
    // console.log(membre._id);
    
  }
  
  const Supprimer = async(id) => {
    const confirmation = window.confirm("Etes vous de supprimer ?")
    if (!confirmation) return
   try{
       const suppression = await api.delete(`/api/membres/supprimer/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('pos-token')}`
        }
      }

    )
    if(suppression.data.success){
      toast.success('Membre Supprimé avec succés')
      AfficherMembre()
    }
    else{
      toast.error('Erreur lors de la suppréssion')
    }
   }

   catch(error){
    console.log("error",error);
    toast.error("Erreur de suppression, veuillez ressayer")
   }
  }

  const [loading, setLoading] = useState(true);
  const handlechange =  (e) => {
    const { name, value } = e.target;
    setData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Modifier)
      {
      try {
        const response = await api.put(`/api/membres/update/${Modifier}`,data,
          {
            headers: {
              authorization : `Bearer ${localStorage.getItem('pos-token')}`
            }
          }
        )
        if(response.status == 200 || response.data){
          toast.success('Modification reuissi')
          setData({
            nom: "",
            prenom: "",
            email: "",
            password: "",
            telephone: "",
            adresse: "",
          });
          SetModifier(null)
          AfficherMembre()
        }
      } catch (error) {
        toast.error('Erros de  la modification')
      }
    }
else{
  try {
      const response = await api.post("/api/membres/ajouter", data, { 
        headers: {
          authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      if(response.status === 201){
        toast.success('Membre ajouté avec sucess')
        // le backend renvoie le membre créé, on l'ajoute à la liste existante
        setMembres((prev) => [...prev, response.data])
        setLoading(true)
      }
      setData({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        telephone: "",
        adresse: "",
      })
      
    } catch (error) {
      console.error("Erreur d'ajout", error);
      toast.error(error.response?.data?.message || "Erreur lors de l'ajout")
      setLoading(false)
      
    }
}
    
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8">Gestion de membre</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3">
          <div className=" shadow-md bg-amber-50 rounded-lg p-4">
            <h2 className="text-center text-xl font-bold mb-4">
              Ajouter Membre
            </h2>
            <form action="" method="post" onSubmit={handleSubmit}>
              <div className="m-3">
                <input
                  type="text"
                  placeholder="Entrer votre Nom"
                  className="border w-full p-2 rounded-md"
                  name="nom"
                  value={data.nom}
                  onChange={handlechange}
                />
              </div>

              <div className="m-3">
                <input
                  type="text"
                  placeholder="Entrer votre Prenom"
                  className="border w-full p-2 rounded-md"
                  name="prenom"
                  value={data.prenom}
                  onChange={handlechange}
                />
              </div>

              <div className="m-3">
                <input
                  type="email"
                  placeholder="Entrer votre email"
                  className="border w-full p-2 rounded-md"
                  name="email"
                  value={data.email}
                  onChange={handlechange}
                />
              </div>
              <div className="m-3">
                <input
                  type="password"
                  placeholder="Entrer votre mtp"
                  className="border w-full p-2 rounded-md"
                  name="password"
                  value={data.password}
                  onChange={handlechange}
                />
              </div>

              <div className="m-3">
                <input
                  type="text"
                  placeholder="Entrer votre telephone"
                  className="border w-full p-2 rounded-md"
                  name="telephone"
                  value={data.telephone}
                  onChange={handlechange}
                />
              </div>

              <div className="m-3">
                <input
                  type="text"
                  placeholder="Entrer votre adresse"
                  className="border w-full p-2 rounded-md"
                  name="adresse"
                  value={data.adresse}
                  onChange={handlechange}
                />
              </div>

              <div className="">
                <button
                  className="w-full bg-amber-100 py-1 rounded-md cursor-pointer"
                  type="submit"
                >
                  {Modifier ? 'modifer' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:w-2/3 w-full overflow-x-auto">
  <table className="w-full min-w-[800px] border-collapse bg-white shadow-md rounded-lg overflow-hidden mt-4">
    
    <thead className="bg-gray-100">
     
      <tr>
        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
          Nom
        </th>
        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
          Prénom
        </th>
        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
          Téléphone
        </th>
        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
          Email
        </th>
        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
          Adresse
        </th>
        <th className="border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700">
          Action
        </th>
      </tr>
    </thead>

    <tbody>

    {membres.map((membre,index) => (
      <tr className="hover:bg-gray-50 transition-colors duration-200" key={index}>
        <td className="border border-gray-200 px-4 py-3">
          {membre.nom}
        </td>

        <td className="border border-gray-200 px-4 py-3">
          {membre.prenom}
        </td>

        <td className="border border-gray-200 px-4 py-3">
          {membre.telephone}
        </td>

        <td className="border border-gray-200 px-4 py-3">
          {membre.email}
        </td>

        <td className="border border-gray-200 px-4 py-3">
          {membre.adresse}
        </td>

        <td className="border border-gray-200 px-4 py-3">
          <div className="flex justify-center gap-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md 
                         hover:bg-blue-600 transition-colors duration-200"
                         onClick={() => modifer(membre)}
            >
              Modifier
            </button>

            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md 
                         hover:bg-red-600 transition-colors duration-200" onClick={() => Supprimer(membre._id)}
            >
              Supprimer
            </button>
          </div>
        </td>
      </tr>
    ))}
      
    </tbody>

  </table>
</div>
      </div>
    </div>
  );
};

export default Membre;
