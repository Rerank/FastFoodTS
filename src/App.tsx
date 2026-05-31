import CartProvider from '@/context/CartProvider'
import Router from '@/router/Router'
import BottomNav from '@/components/common/BottomNav/BottomNav'
import './App.css'

function App() {
  return (
    <CartProvider>          
      <div className="app">
        <Router />
        <BottomNav /> 
      </div>
    </CartProvider>
  )
}

export default App