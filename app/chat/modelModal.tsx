'use client';
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

import {useModelStore} from "@/lib/stores/model.store";

interface Props {
  children: React.ReactNode;
}

const ModelModal: NextComponentType<NextPageContext, {}, Props> = ({
  children,
}: Props) => {

  const model = useModelStore((state) => state.model)

  const setModel = (_model: string) => useModelStore.setState({model: _model})
  

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Выбор модели</AlertDialogTitle>
          <AlertDialogDescription>
            <Select defaultValue={model} onValueChange={setModel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Модель" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini">GeminiPro</SelectItem>
                <SelectItem value="ictis-llama">ICTIS Llama</SelectItem>
              </SelectContent>
            </Select>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction >Сохранить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModelModal;
