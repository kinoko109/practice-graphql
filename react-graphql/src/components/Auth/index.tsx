import React, { FormEvent, useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { jwtDecode } from "jwt-decode"
import { Button, Field, Input, Label } from "@headlessui/react"
import { useNavigate } from "react-router"
import { PiUserSwitchLight } from "react-icons/pi"

import { GET_TOKEN, CREATE_USER } from "../../queries"

const Auth: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [getToken] = useMutation(GET_TOKEN)
  const [createUser] = useMutation(CREATE_USER)

  const [isLogin, setIsLogin] = useState(true)

  const navigate = useNavigate()
  const authUser = async (e: FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      try {
        const result = await getToken({
          variables: {
            username,
            password,
          },
        })
        localStorage.setItem("token", result.data.tokenAuth.token)
        navigate("/employees")
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
        console.error(error)
      }
    } else {
      try {
        await createUser({
          variables: {
            username,
            password,
          },
        })
        const result = await getToken({
          variables: {
            username,
            password,
          },
        })
        localStorage.setItem("token", result.data.tokenAuth.token)
        navigate("/employees")
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
        console.error(error)
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLogin(true)
      const decodedToken = jwtDecode(token)
      if (!decodedToken.exp) return
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token")
      } else {
        window.location.href = "/employees"
      }
    }
  }, [])

  return (
    <div>
      <form onSubmit={authUser}>
        <Field className="flex justify-center">
          <Label>Name</Label>
          <Input
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300"
          />
        </Field>
        {/*<div>*/}
        {/*  <label htmlFor="username">ユーザー名：</label>*/}
        {/*  <input*/}
        {/*    id="username"*/}
        {/*    type="text"*/}
        {/*    value={username}*/}
        {/*    onChange={(event) => setUsername(event.target.value)}*/}
        {/*  />*/}
        {/*</div>*/}
        <Field className="mt-2 flex justify-center">
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300"
          />
        </Field>
        {/*<div>*/}
        {/*  <label htmlFor="password">パスワード：</label>*/}
        {/*  <input*/}
        {/*    id="password"*/}
        {/*    type="text"*/}
        {/*    value={password}*/}
        {/*    onChange={(event) => setPassword(event.target.value)}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
          >
            {isLogin ? "ログイン" : "新規登録"}
          </Button>
          <Button onClick={() => setIsLogin(!isLogin)}>
            <PiUserSwitchLight size={50} />
          </Button>
        </div>
      </form>
      Auth
    </div>
  )
}

export default Auth
