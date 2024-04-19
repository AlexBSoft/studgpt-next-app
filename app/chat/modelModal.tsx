import type { NextComponentType, NextPageContext } from "next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  children: React.ReactNode;
}

const ModelModal: NextComponentType<NextPageContext, {}, Props> = ({
  children,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Выбор модели</AlertDialogTitle>
          <AlertDialogDescription>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Модель" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Gemini</SelectItem>
                <SelectItem value="dark">GPT-3.5</SelectItem>
                <SelectItem value="system">Ollama-wizardlm2</SelectItem>
              </SelectContent>
            </Select>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction>Сохранить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModelModal;
