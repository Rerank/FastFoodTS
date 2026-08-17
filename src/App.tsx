import CartProvider from '@/context/CartProvider'
import AuthProvider from '@/context/AuthProvider'
import Router from '@/router/Router'
import BottomNav from '@/components/common/BottomNav/BottomNav'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Router />
          <BottomNav />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App