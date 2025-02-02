"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { type KeyboardEvent, useState } from "react";
import { Copy, AlertCircle } from "lucide-react";
import { Link } from "@nextui-org/link";
import { useSession } from "next-auth/react";
import { NewLink } from "~/server/actions";
import { motion, AnimatePresence } from "framer-motion";

export default function NewUrlInput() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const session = useSession();

  const isInvalid = !URL.canParse(longUrl) && longUrl.length !== 0;

  const paste = async () => {
    try {
      await navigator.clipboard.readText().then((t) => setLongUrl(t));
    } catch (e) {
      console.log(e);
    }
  };

  const submit = async () => {
    setLoading(true);
    setShortUrl(await NewLink(longUrl));
    setLongUrl("");
    setLoading(false);
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key !== "Enter" || isInvalid || longUrl.length === 0) return;
    await submit();
  };

  return (
    <>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="please provide url"
            onChange={(e) => setLongUrl(e.target.value)}
            isInvalid={isInvalid}
            value={longUrl}
            onKeyDown={handleKeyDown}
          />
          <AnimatePresence mode="wait">
            {isInvalid && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 mt-1 text-danger text-sm"
              >
                <AlertCircle size={14} />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Please provide a valid URL
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Button isIconOnly variant="faded" color="primary" onClick={paste}>
          <Copy size={20} />
        </Button>
        <Button
          color="primary"
          onClick={submit}
          isDisabled={!URL.canParse(longUrl) || longUrl.length === 0}
          isLoading={loading}
        >
          submit
        </Button>
      </div>
      <AnimatePresence>
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex justify-center"
          >
            <div className="flex justify-center flex-col items-center">
              <Link className="text-lg m-2" target="_blank" href={shortUrl}>
                {shortUrl}
              </Link>
              {!session.data?.user && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400 font-light m-2"
                >
                  To save your URL, please sign in to your account.
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
