import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "emailjs-com";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { config } from "@/config";
import { ArrowRight, Loader2 } from "lucide-react";

// Schéma de validation
const visitPlannerSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  objet: z.string().min(5, "L'objet doit contenir au moins 5 caractères"),
});

type VisitPlannerFormData = z.infer<typeof visitPlannerSchema>;

export const VisitPlannerDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<VisitPlannerFormData>({
    resolver: zodResolver(visitPlannerSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      objet: "",
    },
  });

  const onSubmit = async (data: VisitPlannerFormData) => {
    setIsLoading(true);
    try {
      // Initialiser EmailJS
      emailjs.init("Lc10mJpV9NRuvgPwq");

      // Préparer les paramètres pour le template EmailJS
      const templateParams = {
        to_email: config.contact.email,
        from_name: `${data.prenom} ${data.nom}`,
        from_email: data.email,
        subject: "Nouvelle demande de visite",
        objet_visite: data.objet,
        nom: data.nom,
        prenom: data.prenom,
        visitor_email: data.email,
      };

      // Envoyer l'email via EmailJS
      await emailjs.send(
        "service_3n2ie3a",
        "hygklvd",
        templateParams
      );

      toast({
        title: "Succès!",
        description:
          "Votre demande de visite a été envoyée. Merci de nous avoir contactés!",
        variant: "default",
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button 
        variant="gold" 
        size="xl"
        onClick={() => setOpen(true)}
      >
        Planifier votre visite <ArrowRight size={18} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Planifier votre visite</DialogTitle>
            <DialogDescription>
              Remplissez le formulaire ci-dessous pour nous informer de votre visite
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jean"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dupont"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jean@example.com"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="objet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objet de la visite</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez brièvement l'objet de votre visite..."
                        className="resize-none"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Envoi en cours..." : "Envoyer la demande"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
