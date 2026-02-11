import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Name, Response } from '../backend';

export function useCheckResponse() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['checkResponse'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.checkResponse();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitResponse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, response }: { name: Name; response: Response }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitResponse(name, response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkResponse'] });
    },
  });
}
