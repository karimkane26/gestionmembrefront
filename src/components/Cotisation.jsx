import { useEffect, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

// les mois sans accent, comme dans le modèle Mongo
const listeMois = [
  "janvier", "fevrier", "mars", "avril", "mai", "juin",
  "juillet", "aout", "septembre", "octobre", "novembre", "decembre",
];

const Cotisation = () => {
  const [membres, setMembres] = useState([]);
  const [cotisations, setCotisations] = useState([]);
  const [Modifier, SetModifier] = useState(null);

  const [data, setData] = useState({
    membreId: "",
    mois: "",
    motif: "",
    montant: "",
  });

  useEffect(() => {
    AfficherMembre();
    AfficherCotisation();
  }, []);

  const AfficherMembre = async () => {
    try {
      const response = await api.get("/api/membres/obtenir", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setMembres(response.data.membres);
    } catch (error) {
      console.error("Erreur de recuperation membre", error);
    }
  };

  const AfficherCotisation = async () => {
    try {
      const response = await api.get("/api/cotisations/obtenir", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setCotisations(response.data.cotisations);
    } catch (error) {
      console.error("Erreur de recuperation cotisation", error);
    }
  };

  function modifer(cotisation, mois) {
    setData({
      membreId: cotisation.matricule?._id,
      mois: mois,
      motif: cotisation.mois[mois].motif,
      montant: cotisation.mois[mois].montant,
    });
    SetModifier(cotisation._id);
  }

  const viderFormulaire = () => {
    setData({
      membreId: "",
      mois: "",
      motif: "",
      montant: "",
    });
    SetModifier(null);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Modifier) {
      try {
        const response = await api.put(`/api/cotisations/modifier/${Modifier}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        });
        if (response.status === 200) {
          toast.success("Modification reussie");
          viderFormulaire();
          AfficherCotisation();
        }
      } catch (error) {
        toast.error("Erreur de la modification");
      }
    } else {
      try {
        const response = await api.post("/api/cotisations/ajouter", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        });
        if (response.status === 201) {
          toast.success("Cotisation ajoutée avec succès");
          viderFormulaire();
          AfficherCotisation();
        }
      } catch (error) {
        console.error("Erreur d'ajout", error);
        toast.error(error.response?.data?.message || "Erreur lors de l'ajout");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8">Gestion de cotisation</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3">
          <div className=" shadow-md bg-amber-50 rounded-lg p-4">
            <h2 className="text-center text-xl font-bold mb-4">
              {Modifier ? "Modifier Cotisation" : "Ajouter Cotisation"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="m-3">
                <select
                  className="border w-full p-2 rounded-md"
                  name="membreId"
                  value={data.membreId}
                  onChange={handlechange}
                  disabled={Modifier}
                  required
                >
                  <option value="">Choisir un membre</option>
                  {membres.map((membre) => (
                    <option key={membre._id} value={membre._id}>
                      {membre.prenom} {membre.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="m-3">
                <select
                  className="border w-full p-2 rounded-md"
                  name="mois"
                  value={data.mois}
                  onChange={handlechange}
                  disabled={Modifier}
                  required
                >
                  <option value="">Choisir un mois</option>
                  {listeMois.map((mois) => (
                    <option key={mois} value={mois}>
                      {mois}
                    </option>
                  ))}
                </select>
              </div>

              <div className="m-3">
                <input
                  type="text"
                  placeholder="Motif"
                  className="border w-full p-2 rounded-md"
                  name="motif"
                  value={data.motif}
                  onChange={handlechange}
                />
              </div>

              <div className="m-3">
                <input
                  type="number"
                  placeholder="Montant"
                  className="border w-full p-2 rounded-md"
                  name="montant"
                  value={data.montant}
                  onChange={handlechange}
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  className="w-full bg-amber-100 py-1 rounded-md cursor-pointer"
                  type="submit"
                >
                  {Modifier ? "Modifier" : "Ajouter"}
                </button>
                {Modifier && (
                  <button
                    className="w-full bg-gray-200 py-1 rounded-md cursor-pointer"
                    type="button"
                    onClick={viderFormulaire}
                  >
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="lg:w-2/3 w-full overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse bg-white shadow-md rounded-lg overflow-hidden mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Membre
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Mois
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Motif
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Montant
                </th>
                <th className="border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {cotisations.map((cotisation) =>
                Object.keys(cotisation.mois || {}).map((mois) => (
                  <tr
                    className="hover:bg-gray-50 transition-colors duration-200"
                    key={cotisation._id + mois}
                  >
                    <td className="border border-gray-200 px-4 py-3">
                      {cotisation.matricule?.prenom} {cotisation.matricule?.nom}
                    </td>

                    <td className="border border-gray-200 px-4 py-3">{mois}</td>

                    <td className="border border-gray-200 px-4 py-3">
                      {cotisation.mois[mois].motif}
                    </td>

                    <td className="border border-gray-200 px-4 py-3">
                      {cotisation.mois[mois].montant}
                    </td>

                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-md
                                     hover:bg-blue-600 transition-colors duration-200"
                          onClick={() => modifer(cotisation, mois)}
                        >
                          Modifier
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cotisation;
