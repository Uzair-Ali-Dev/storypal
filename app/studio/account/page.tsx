"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";

export default function AccountPage() {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const user = session?.user;

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No user is currently logged in.");
      }

      // Reauthenticate the user before deleting the account
      const credentials = EmailAuthProvider.credential(user.email!, password);
      await reauthenticateWithCredential(user, credentials);

      // Fetch and delete the user's stories from Firestore
      const storiesRef = collection(db, "stories");
      const storiesQuery = query(storiesRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(storiesQuery);

      if (!querySnapshot.empty) {
        // Delete each story document
        const deletePromises = querySnapshot.docs.map((doc) =>
          deleteDoc(doc.ref)
        );
        await Promise.all(deletePromises);
      }

      // Delete user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      await deleteDoc(userDocRef);

      // Delete the Firebase user account
      await deleteUser(user);

      await signOut({ redirect: false });

      // Redirect to the landing page
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          toast({
            title: "Error",
            description: "Incorrect password",
            variant: "destructive",
          });
        } else {
          console.error("Unexpected error:", error);
          toast({
            title: "Error",
            description:
              "An error occurred while deleting your account. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description:
            "An error occurred while deleting your account. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col flex-1 ">
      <div className="w-full max-w-6xl mx-auto bg-white  rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Account Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your account details and preferences.
        </p>

        {/* Profile Details */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              type="text"
              value={user?.username || ""}
              disabled
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              value={user?.email || ""}
              disabled
              className="mt-1"
            />
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
          <p className="text-sm text-gray-600 mt-1">
            Deleting your account is irreversible. All your data will be
            permanently removed.
          </p>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
            className="mt-4"
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <p className="text-sm text-gray-600">
              Deleting your account will remove all your data permanently. This
              action cannot be undone.
            </p>
          </DialogHeader>

          {/* Password Input for Reauthentication */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter your password to confirm
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              disabled={isDeleting}
            />
          </div>

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
