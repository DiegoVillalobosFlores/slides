import styles from './Home.module.scss'

export default function Home() {
    return (
      <div className={styles.root}>
        <h1>Welcome to Slides</h1>
        <p>In this page we will explore multiple cutting edge concepts, like:</p>
        <ol>
          <li>
            Real-time communication with only Redis and Next
          </li>
          <li>
            Next 13 app with Next Font and Parallel Routes
          </li>
          <li>
            Framer Motion for animations
          </li>
        </ol>
        <span>
              On the right side of this page you will see two seemingly identical components
              <br/>
              But they have different roles, on the top of the screen you will see the <blockquote>Editor</blockquote>
              <br/>
              While the bottom component is the <blockquote>Live View</blockquote>
              <br/>
              <br/>
              These components are not connected and are rather two pages rendered at the same time.
              <br/>
              The editor pushes all the changes to the Redis Stream that is in charge of sending all the changes
              to the Live View
          </span>
      </div>
    )
}