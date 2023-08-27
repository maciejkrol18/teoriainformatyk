import CardSkeleton from "./CardSkeleton"

interface ExamSkeletonProps {}

export default function ExamSkeleton({}: ExamSkeletonProps) {
  return Array.from({ length: 10 }).map((el, idx) => (
    <CardSkeleton className="mb-8" key={idx} />
  ))
}
