import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Navigation2,Chrome } from "lucide-react"

export default function Login({ setUserEmail }) {
  const API_BASE = import.meta.env.VITE_API_URL
  // const API_BASE = "http://localhost:5000"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const {toast} = useToast();
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      })

      if (res.status === 200) {
        localStorage.setItem("userEmail", res.data.user.email)
        toast({
          title: "Log in successful!!",
          description: "Welcome back!",
          variant:"success"
        })
        
        setUserEmail(email)
        navigate("/SavedRoutes")
      }
    } catch (err) {
      toast({
        title: "Log in failed !",
        description: "Invalid email or password",
        variant: "destructive",
      })
      
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md shadow-lg border border-gray-100">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-2">
              <Navigation2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-semibold text-blue-700">
              Welcome back
            </CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-blue-700">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>

              {/* Submit */}
              <Button type="submit" size="lg" className="w-full cursor-pointer">
                Sign In
              </Button>
            </form>

            {/* Divider */}
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div> */}

            {/* OAuth buttons (UI only) */}
            {/* <div className="flex justify-center">
              <Button variant="outline" className="w-full cursor-pointer">
                <Chrome className="h-6 w-6"/>
                Google
              </Button>
              
            </div> */}

            {/* Signup */}
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/SignUp"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
