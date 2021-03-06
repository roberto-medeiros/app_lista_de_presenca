import React, { useState, useEffect } from "react";


import "./styles.css";
              //Typescript Cardprops que foi importado do componente Card
import { Card, CardProps } from "../../components/Card";

//Typescript Tipando Resposta de API
type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState("");
                                          //Typescript
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

//Função para adiconar estudante na lista
  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
   //prevState é para manter o valor anterior e o new, para adiconar um novo valor
    setStudents((prevState) => [...prevState, newStudent]);
  }

  // useEffect(()=>{
  //   //Corpo do useEffect
  //   //Consumindo API do Github
  //   fetch('https://api.github.com/users/roberto-medeiros')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUser({
  //         name: data.name,
  //         avatar: data.avatar_url,
  //       });
  //     });
  //   console.log('O Use effect foi chamado')
  // }, []);

  //Exemplo como lidar com requisições assíncronas utilizando o Hook useEffect
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/roberto-medeiros");
      //                               Usando Tipagem de resposta da API
      const data = await response.json() as ProfileResponse;
      console.log("DADOS =>", data);

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();
  }, []);


  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          {/* Usando conteúdo dinamico, vindo da API do Github */}
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      {/* Importantdo componente Card */}
      {students.map((student) => (
        <Card 
        key={student.time} 
        name={student.name} 
        time={student.time} 
        />
      ))}
    </div>
  );
}