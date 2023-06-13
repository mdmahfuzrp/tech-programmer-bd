import { useState } from 'react'
import { useEffect } from 'react';
function App() {

  const [theme, setTheme] = useState('light-theme');

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    }
    else {
      setTheme('light-theme');
    }
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme])

  return (
    <>
      <div className='var'>
        <button className='custom-btn'>Enroll Now</button>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum corporis quam voluptatem ullam labore ratione cum, consequatur nostrum alias repellendus. Reiciendis rerum aliquid similique recusandae saepe dicta deserunt repellendus quia!</p>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, vero?</span>
        <button className='custom-btn' onClick={toggleTheme}>Change Mood</button>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt dicta inventore unde facilis distinctio sapiente, voluptatem rerum quam deserunt ipsum.</p>
      </div>
    </>
  )
}

export default App
