import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

export const Modal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Edit profile
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-[95vw] max-w-md">
          <Dialog.Title className="text-xl font-semibold mb-2">
            Edit profile
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mb-4">
            Make changes to your profile
          </Dialog.Description>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  id="name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Freja Johnsen"
                aria-label="Enter your name"
                  className="w-full px-3 py-2 border rounded-md"
                />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="freja@example.com"
                  aria-label="Enter your email"
                  className="w-full px-3 py-2 border rounded-md"
                />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Save
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};