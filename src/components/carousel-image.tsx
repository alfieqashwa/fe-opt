import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"

type CarouselImageProps = {
  images: string[]
  width?: number
  height?: number
}

export function CarouselImage({ images, width, height }: CarouselImageProps) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="mx-auto w-full max-w-4xl"
    >
      <CarouselContent>
        {images.map((image, i) => (
          <CarouselItem className="basis-1/3" key={i}>
            <div className="p-1">
              <Card>
                <CardContent className="p-6">
                  <Image
                    src={image}
                    alt="Product Thumbnail"
                    loading="lazy"
                    width={width}
                    height={height}
                    className="mx-auto"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
