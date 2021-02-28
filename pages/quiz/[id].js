/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

// eslint-disable-next-line react/prop-types
export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>

  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto);
      // .catch((error) => {
      //   console.log(error);
      // });

    // console.log('dbExterno', dbExterno);
    // console.log('infos do next', context.query.id);

    return {
      props: {
        dbExterno,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}
