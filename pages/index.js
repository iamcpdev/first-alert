import fetch from 'isomorphic-unfetch'
import { orderBy } from 'lodash'
import Head from 'next/head'

const Text = ({ id, body, time }) => (
  <li>
    <span>{time}</span>
    <strong>{body}</strong>
    <style jsx>{`
      li {
        background-color: #fff;
        padding: 1rem;
        border-radius: 6px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.125);
      }
      strong {
        display: block;
      }
      span {
        color: #aaa;
        font-size: 0.875rem;
      }
      @media (prefers-color-scheme: dark) {
        li {
          background-color: #333;
        }
      }
    `}</style>
  </li>
)

export default ({ texts = [] }) => (
  <main>
    <Head>
      <title>First Alert</title>
    </Head>
    <h1>First Alert</h1>
    <ul>
      {texts.map(({ id, fields}) =>
        <Text
          key={id}
          id={id}
          body={fields.textMessages}
          time={fields.createdTime}
        />
      )}
    </ul>
    <style jsx global>{`
      body {
        margin: 0;
        background-color: #eee;
        font-family: "Avenir Next", system-ui, sans-serif;
        padding: 3rem 2rem;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #1e1e1e;
          color: #fff;
        }
      }
    `}</style>
    <style jsx>{`
      h1 {
        font-size: 3rem;
        text-align: center;
        margin-top: 0;
        margin-bottom: 1rem;
      }
      ul {
        list-style: none;
        padding-left: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
        grid-gap: 2rem;
      }
    `}</style>
  </main>
)
  
export const getStaticProps = async () => {
  const texts = await fetch('https://api.airtable.com/v0/appt0Tc0M5axoEOf8/Respondent%20Info?api_key=keyADDylrdI5ha5ax')
    .then(res => res.json())
    .then(json => orderBy(json.records, 'fields.createdTime', 'desc'))
  return { props: { texts } }
}
