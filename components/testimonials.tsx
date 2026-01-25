import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        name: "Mya Ccount",
        date: "July 2024",
        rating: 5,
        text: "It was a relief to work with such a dependable and trustworthy team. Amit kept every promise, from timelines to budget and quality. Their integrity and professionalism shone through every stage of our project."
    },
    {
        name: "Jorge Barragan Jr",
        date: "July 2024",
        rating: 5,
        text: "Choosing them for our bathroom remodel was the best decision we could have made. The process was incredibly smooth and stress-free, thanks to their organized and efficient team. The result? A stunning bathroom that feels like a spa retreat!"
    },
    {
        name: "Natalie Buxton",
        date: "June 2024",
        rating: 5,
        text: "The attention to detail that the team showed during our kitchen overhaul was phenomenal. Every little aspect was considered, resulting in a flawless finish that perfectly matches our aesthetic. They don't overlook any detail, no matter how small."
    }
]

export function Testimonials() {
    return (
        <section id="testimonials" className="py-20 md:py-28 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-primary uppercase tracking-wider text-sm font-medium mb-3">Testimonials</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">What Our Clients Say</h2>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                            ))}
                        </div>
                        <span className="text-foreground font-semibold">5.0</span>
                        <span className="text-muted-foreground">based on 14+ Google Reviews</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name} className="bg-card border-border">
                            <CardContent className="p-6">
                                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-card-foreground leading-relaxed mb-6 text-pretty">
                                    &ldquo;{testimonial.text}&rdquo;
                                </p>
                                <div className="border-t border-border pt-4">
                                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.date} • Verified Google Review</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
