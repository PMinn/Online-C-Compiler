import Head from 'next/head'
import styles from "../styles/index.module.css"
import Script from 'next/script'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Online C Compiler</title>
      </Head>
      <div id="bar" className={styles.bar}></div>
      <div className={styles.play} id="play">
        <img src="/play.svg"/>
      </div>

      <div className={`${styles.out} ${styles['textarea-out']}`}>
        <h1>code</h1>
        <textarea id="textarea" wrap="off" className={styles.textarea}></textarea>
      </div>
      <div className={`${styles.out} ${styles['inputTextarea-out']}`}>
        <h1>input</h1>
        <textarea id="inputTextarea" wrap="off" className={styles['inputTextarea']}></textarea>
      </div>
      <div className={`${styles.out} ${styles['result-out']}`}>
        <h1>output</h1>
        <textarea id="result" wrap="off" disabled={true} className={styles.result}></textarea>
      </div>
      <div className={styles.out}>
        <div className={styles['spend-block']}>耗時:<div id="spend"></div>ms</div>
      </div>

      <style jsx global>{`
        html,
        body {
          background-color: #242424;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        *::-webkit-scrollbar {
            width: 7px;
            height: 7px;
            background-color: #242424;
        }
        
        *::-webkit-scrollbar-thumb {
            background: #666666;
            border-radius: 7px;
        }
        
        textarea {
            width: 90vw;
            border: 1px #999999 solid;
            background-color: #242424;
            color: #fff;
            outline: none;
            font-size: 1.2rem;
            overflow: scroll;
        }
      `}</style>
      <Script src="/js/index.js" />
    </div>
  )
}