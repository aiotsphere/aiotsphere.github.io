"use client"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: Props) {
  return (
    <button
      {...props}
      className={`inline-flex items-center rounded-md bg-primary text-white px-4 py-2 hover:opacity-95 ${props.className ?? ''}`}
    />
  )
}
