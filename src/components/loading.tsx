import { Loader2 } from "lucide-react"

type Props = { size?: number }
export const LoadingSpinner = ({ size = 50 }: Props) => (
  <div className="grid h-[calc(64vh)] w-full place-items-center">
    <Loader2 size={size} color="rgb(148 163 184)" className="animate-spin" />
  </div>
)
