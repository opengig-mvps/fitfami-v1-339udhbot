'use client' ;
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Check, Heart, Image, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LandingPage = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const pricingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    );
    gsap.fromTo(
      featuresRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.5 }
    );
    gsap.fromTo(
      testimonialsRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 1 }
    );
    gsap.fromTo(
      pricingRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 1.5 }
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section ref={heroRef} className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Foodgram</h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600">
              Share your delicious food creations and explore recipes from around the world.
            </p>
            <img
              src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY"
              alt="Food"
              className="mx-auto mb-6 w-full max-w-md rounded-lg shadow-lg"
            />
            <div className="flex justify-center space-x-4">
              <Button className="bg-green-500 text-white hover:bg-green-600">Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </section>
        <section ref={featuresRef} className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Features</h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Discover the amazing features of Foodgram that make sharing and discovering recipes a delightful experience.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <Heart className="mx-auto mb-4 h-12 w-12 text-red-500" />
                  <CardTitle>Like & Share</CardTitle>
                  <CardDescription>Interact with your favorite content by liking and sharing.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Image className="mx-auto mb-4 h-12 w-12 text-green-500" />
                  <CardTitle>Photo Upload</CardTitle>
                  <CardDescription>Upload photos of your delicious creations.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Share className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                  <CardTitle>Recipe Sharing</CardTitle>
                  <CardDescription>Share your recipes with the community.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <section ref={testimonialsRef} className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="max-w-2xl mx-auto mb-12 text-lg text-gray-600">
              Hear from our community about their experience with Foodgram.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-gray-500">Chef, Foodie</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">"Foodgram has revolutionized the way I share my recipes. The community is so supportive!"</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Sarah Miller</p>
                      <p className="text-xs text-gray-500">Home Cook</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">"I love the ease of use and the amazing recipes I discover every day on Foodgram."</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Michael Johnson</p>
                      <p className="text-xs text-gray-500">Food Blogger</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">"Foodgram is my go-to platform for sharing my food adventures and connecting with fellow food enthusiasts."</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section ref={pricingRef} className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Pricing</h2>
            <p className="max-w-2xl mx-auto mb-12 text-lg text-gray-600">
              Choose a plan that suits your needs and start sharing your delicious recipes today.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Free</CardTitle>
                  <CardDescription className="text-4xl font-bold mb-4">$0<span className="text-xl font-medium text-gray-500">/mo</span></CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-2">
                    <li><Check className="inline-block mr-2 h-4 w-4 text-green-500" />Unlimited Posts</li>
                    <li><Check className="inline-block mr-2 h-4 w-4 text-green-500" />Like & Share</li>
                    <li><Check className="inline-block mr-2 h-4 w-4 text-green-500" />Follow Users</li>
                  </ul>
                </CardContent>
                <Button className="w-full mt-4">Get Started</Button>
              </Card>
              <Card className="text-center bg-green-500 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Pro</CardTitle>
                  <CardDescription className="text-4xl font-bold mb-4">$9<span className="text-xl font-medium">/mo</span></CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><Check className="inline-block mr-2 h-4 w-4" />Unlimited Posts</li>
                    <li><Check className="inline-block mr-2 h-4 w-4" />Like & Share</li>
                    <li><Check className="inline-block mr-2 h-4 w-4" />Follow Users</li>
                    <li><Check className="inline-block mr-2 h-4 w-4" />Ad-Free Experience</li>
                    <li><Check className="inline-block mr-2 h-4 w-4" />Exclusive Content</li>
                  </ul>
                </CardContent>
                <Button className="w-full mt-4 bg-white text-green-500 hover:bg-gray-100">Get Started</Button>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
                  <CardDescription className="text-4xl font-bold mb-4">$29<span className="text-xl font-medium text-gray-500">/mo</span></CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-2">
                    <li><Check className="inline-block mr-2 h-4 w-4 text-green-500" />Unlimited Posts</li>
                    <li><Check className="inline-block mr-2 h-4 w-4 text-green-500" />Like & Share</li>
                    <li><Check className="inline-block mr-2 h-4 w-4 text-green-500" />Follow Users</li>
                    <li><Check className="inline-block mr-2 h-4 w-4 text-green-500" />Ad-Free Experience</li>
                    <li><Check className="inline-block mr-2 h-4 w-4 text-green-500" />Exclusive Content</li>
                    <li><Check className="inline-block mr-2 h-4 w-4 text-green-500" />Dedicated Support</li>
                  </ul>
                </CardContent>
                <Button className="w-full mt-4">Get Started</Button>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-green-100 p-6 w-full">
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold mb-2">Product</h3>
            <ul>
              <li><a href="#" className="hover:underline">Features</a></li>
              <li><a href="#" className="hover:underline">Integrations</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Security</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul>
              <li><a href="#" className="hover:underline">Documentation</a></li>
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Community</a></li>
              <li><a href="#" className="hover:underline">Templates</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <ul>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;