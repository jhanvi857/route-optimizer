"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { Navbar } from "@//components/navbar"
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
import { Navigation2, Chrome } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import "../globals.css"
export default function SignUp({ setUserEmail }) {
  const API_BASE = import.meta.env.VITE_API_URL
  const {toast} = useToast();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [msg, setMsg] = useState("")
  const handleSignUp = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters")
      return
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/
    if (!passwordRegex.test(password)) {
      setMsg("Password must contain at least one letter and one number.")
      return
    }

    if (password !== confirmPassword) {
      setMsg("Passwords do not match")
      return
    }

    try {
      const res = await axios.post(`${API_BASE}/api/auth/signup`, {
        name,
        email,
        password,
      })

      console.log("Signup successful", res.data)
      toast({
        title: "Account created successfully !",
        description: "Signup successful. Please login to continue.",
        variant:"success"
      })
      
      localStorage.setItem("userEmail", email)
      setUserEmail(email)

      setMsg("")
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (err) {
      console.error("Signup failed", err.response?.data || err.message)
      toast({
        title: "Sign up failed !",
        description: err.response?.data?.msg || "Something went wrong. Try again.",
        variant: "destructive",
      })
      
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md shadow-lg border border-gray-50">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-2">
              <Navigation2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-semibold text-blue-700">
              Create an account
            </CardTitle>
            <CardDescription>
              Get started with smart route optimization
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              {msg && (
                <p className="text-sm text-destructive text-center font-medium">
                  {msg}
                </p>
              )}

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-700">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                <Label htmlFor="password" className="text-blue-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-blue-700">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button size="lg" className="w-full cursor-pointer" type="submit">
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* OAuth buttons (UI only) */}
            <div className="flex justify-center">
              <Button variant="outline" className="w-full cursor-pointer">
                <Chrome className="h-6 w-6"/>
                Google</Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/Login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}