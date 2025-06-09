import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CompleteUrlRequestSchema, completeUrlRequestSchemaResolver } from "@/core/schema/url"
import { Fetcher } from "@/lib/fetch"
import { X } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

interface AddPasswordToUrlModalProps {
  id: string;
  initialPassword: boolean;
  onClose: () => void;
}

const AddPasswordToUrlModal = ({ id, initialPassword, onClose, }: AddPasswordToUrlModalProps) => {
  const form = useForm<CompleteUrlRequestSchema>({
    resolver: completeUrlRequestSchemaResolver,
    defaultValues: { password: '' }
  })

  const onSubmit = async (data: CompleteUrlRequestSchema) => {
    try {
      await Fetcher(`/urls/${id}`, {
        method: "PATCH",
        body: data
      });
      toast("Password successfully added")
      onClose()
    } catch (error) {
      console.log("Error locking password", error)
    }

  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-app-white-500 shadow-md rounded-md w-[400px] p-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between gap-8">
            <X onClick={onClose} className="float-right text-app-dark-500 cursor-pointer" />
            <FormField control={form.control} name="password" render={({ field, fieldState }) => (
              <FormItem className="flex flex-col justify-between gap-4">
                <FormLabel className="text-sm font-medium text-app-dark-400">
                  Lock your Url
                </FormLabel>
                <FormControl>
                  <Input className="border border-app-white-200 rounded px-4 py-2" {...field} placeholder="Enter Password 8 to 12 chars, including uppercase"></Input>
                </FormControl>
                {
                  fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )
                }
              </FormItem>
            )} />
            <Button className="w-full bg-app-dark-300 text-app-white-500 hover:bg-app-dark-500 font-medium py-2 rounded"
              type="submit">Lock Url</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export { AddPasswordToUrlModal }