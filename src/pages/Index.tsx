import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Костюм для охоты и рыбалки',
    category: 'Камуфляжная одежда',
    description: 'Профессиональный водонепроницаемый костюм для охоты и рыбалки. Камуфляжная расцветка, усиленная ткань.',
    price: '3 500 ₽',
    image: 'https://cdn.poehali.dev/projects/1c2a157e-19ec-4e79-bcc9-2f7209a38826/files/4044d1ac-9323-4e04-8c66-bb191ebb21e8.jpg',
    features: ['Водонепроницаемый материал', 'Камуфляжная расцветка', 'Усиленные швы', 'Комфортный крой']
  },

];

const services = [
  {
    id: 1,
    title: 'Влагозащита',
    description: 'Специальная обработка ткани обеспечивает надежную защиту от дождя и влаги',
    icon: 'Droplet',
    features: [
      'Водонепроницаемая мембрана',
      'Защита от промокания',
      'Дышащий материал',
      'Проклеенные швы'
    ]
  },
  {
    id: 2,
    title: 'Комфорт и прочность',
    description: 'Надежная конструкция и качественные материалы обеспечивают долговечность и удобство',
    icon: 'ShieldCheck',
    features: [
      'Усиленные швы',
      'Эргономичный крой',
      'Износостойкая ткань',
      'Много карманов'
    ]
  }
];

export default function Index() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: 'levalis19@mail.ru',
    message: ''
  });

  const handleOrder = (product: Product) => {
    setSelectedProduct(product);
    setOrderForm(prev => ({
      ...prev,
      message: `Заказ товара: ${product.name}`
    }));
    setIsOrderDialogOpen(true);
  };

  const submitOrder = () => {
    if (!orderForm.name || !orderForm.phone) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все обязательные поля',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Заказ отправлен!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
    
    setIsOrderDialogOpen(false);
    setOrderForm({ name: '', phone: '', email: 'levalis19@mail.ru', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ОХОТА-РЫБАЛКА
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">
              Характеристики
            </a>
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Преимущества
            </a>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </a>
          </nav>
          <Button variant="default" size="sm" onClick={() => {
            setSelectedProduct(null);
            setOrderForm(prev => ({ ...prev, message: '' }));
            setIsOrderDialogOpen(true);
          }}>
            <Icon name="Mail" className="mr-2 h-4 w-4" />
            Связаться
          </Button>
        </div>
      </header>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 animate-pulse" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold font-heading bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Костюм для охоты и рыбалки
            </h2>
            <p className="text-xl text-muted-foreground">
              Профессиональная экипировка для охоты и рыбалки всего за 3500₽
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full mb-4">
              <Icon name="DollarSign" className="h-5 w-5 text-accent" />
              <span className="font-medium text-accent">Специальная цена 3500₽</span>
            </div>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="gap-2" onClick={() => {
                setSelectedProduct(products[0]);
                setOrderForm(prev => ({ ...prev, message: 'Заказ товара: Костюм для охоты и рыбалки' }));
                setIsOrderDialogOpen(true);
              }}>
                <Icon name="ShoppingBag" className="h-5 w-5" />
                Заказать костюм
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Info" className="h-5 w-5" />
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Характеристики костюма</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Качественная экипировка для профессионалов и любителей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-white relative overflow-hidden group">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-heading">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-2xl font-bold font-heading text-primary mt-4">{product.price}</p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button 
                    className="flex-1 gap-2" 
                    onClick={() => handleOrder(product)}
                  >
                    <Icon name="ShoppingCart" className="h-4 w-4" />
                    Заказать
                  </Button>
                  <Dialog>
                    <Button variant="outline" onClick={() => setSelectedProduct(product)}>
                      Подробнее
                    </Button>
                    {selectedProduct?.id === product.id && (
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="font-heading text-2xl">{product.name}</DialogTitle>
                          <DialogDescription>{product.category}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="aspect-video bg-white rounded-lg overflow-hidden border">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                          </div>
                          <p className="text-muted-foreground">{product.description}</p>
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Icon name="Star" className="h-5 w-5 text-accent" />
                              Характеристики:
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {product.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <Icon name="Check" className="h-4 w-4 text-primary mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t">
                            <p className="text-3xl font-bold font-heading text-primary">{product.price}</p>
                            <Button size="lg" onClick={() => handleOrder(product)}>
                              <Icon name="ShoppingCart" className="mr-2 h-5 w-5" />
                              Заказать
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Преимущества костюма</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Надежная защита и комфорт в любых условиях
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <Icon name={service.icon} className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="font-heading text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon name="Check" className="h-3 w-3 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full gap-2" 
                    variant="outline"
                    onClick={() => {
                      setOrderForm(prev => ({ ...prev, message: `Заказ услуги: ${service.title}` }));
                      setIsOrderDialogOpen(true);
                    }}
                  >
                    <Icon name="Send" className="h-4 w-4" />
                    Оставить заявку
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Контакты</h2>
              <p className="text-muted-foreground">
                Свяжитесь с нами для оформления заказа или получения консультации
              </p>
            </div>

            <Card className="animate-scale-in">
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-2xl">Связаться с нами</CardTitle>
                <CardDescription>Мы ответим вам в ближайшее время</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-6 mb-8">
                  <div className="flex items-center gap-3 text-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Mail" className="h-5 w-5 text-primary" />
                    </div>
                    <a href="mailto:levalis19@mail.ru" className="hover:text-primary transition-colors">
                      levalis19@mail.ru
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя *</Label>
                    <Input 
                      id="name" 
                      placeholder="Иван Иванов"
                      value={orderForm.name}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input 
                      id="phone" 
                      placeholder="+7 (999) 123-45-67"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Расскажите о вашей потребности в спецодежде..."
                      rows={4}
                      value={orderForm.message}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, message: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2" size="lg" onClick={submitOrder}>
                  <Icon name="Send" className="h-5 w-5" />
                  Отправить заявку
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg">LEVALIS</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 LEVALIS. Качественная спецодежда для профессионалов
            </p>
            <a 
              href="mailto:levalis19@mail.ru" 
              className="text-sm text-primary hover:underline flex items-center gap-2"
            >
              <Icon name="Mail" className="h-4 w-4" />
              levalis19@mail.ru
            </a>
          </div>
        </div>
      </footer>

      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">
              {selectedProduct ? `Заказ: ${selectedProduct.name}` : 'Оставить заявку'}
            </DialogTitle>
            <DialogDescription>
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="order-name">Ваше имя *</Label>
              <Input 
                id="order-name" 
                placeholder="Иван Иванов"
                value={orderForm.name}
                onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-phone">Телефон *</Label>
              <Input 
                id="order-phone" 
                placeholder="+7 (999) 123-45-67"
                value={orderForm.phone}
                onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-message">Комментарий</Label>
              <Textarea 
                id="order-message" 
                placeholder="Дополнительная информация..."
                rows={3}
                value={orderForm.message}
                onChange={(e) => setOrderForm(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>
            <Button className="w-full gap-2" onClick={submitOrder}>
              <Icon name="Send" className="h-4 w-4" />
              Отправить заявку
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}