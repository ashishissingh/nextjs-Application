import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { createBotSchema, defaultBotFormValues, type CreateBotFormValues } from '@/lib/schemas/bot.schema';
import { MOCK_USER, type BotInstance } from '@/lib/constants';

interface UseBotFormProps {
  onSuccess?: (newBot: BotInstance) => void;
}

export const useBotForm = ({ onSuccess }: UseBotFormProps = {}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateBotFormValues>({
    resolver: zodResolver(createBotSchema),
    defaultValues: defaultBotFormValues,
  });

  const watchedOperatingMode = form.watch('operatingMode');
  const watchedAgentRole = form.watch('agentRole');
  const watchedIsAgent = form.watch('isAgent');
  const watchedIsSubAgent = form.watch('isSubAgent');
  const showToolsSection = watchedOperatingMode === 'agentic' && (watchedAgentRole === 'standalone' || watchedAgentRole === 'subAgent');
  const showSubAgentsSection = watchedOperatingMode === 'agentic' && watchedAgentRole === 'supervisor';
  const showAdvancedConfigurations = form.watch('enableAdvancedConfigurations');

  const onSubmit = async (values: CreateBotFormValues) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newBot: BotInstance = {
      id: `bot_${Date.now()}`,
      name: values.name,
      description: values.description || '',
      type: 'Chatbot', 
      status: 'draft', 
      creationDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      creatorId: MOCK_USER.id,
      model: values.model,
      instructions: values.instructions,
      operatingMode: values.operatingMode,
      agentRole: values.agentRole,
      isAgent: values.isAgent,
      isSubAgent: values.isSubAgent,
      selectedTools: values.selectedTools,
      selectedSubAgents: values.selectedSubAgents,
      inputGuardrail: values.inputGuardrail,
      outputGuardrail: values.outputGuardrail,
      enableReRanking: values.enableReRanking,
      retrievedContextCitation: values.retrievedContextCitation,
      enableAdvancedConfigurations: values.enableAdvancedConfigurations, 
      generationConfigTemperature: values.generationConfigTemperature,
      maxOutputTokens: values.maxOutputTokens,
      topK: values.topK,
      topP: values.topP,
      endSequence: values.endSequence,
      embeddingModel: values.embeddingModel,
      chunkSize: values.chunkSize,
      chunkOverlap: values.chunkOverlap,
      enableDetailedPdfAnalysis: values.enableDetailedPdfAnalysis,
      searchStrategy: values.searchStrategy,
      maxResults: values.maxResults,
      consolidateSearchResultsBySource: values.consolidateSearchResultsBySource,
    };
    
    toast({
      title: 'Bot Created Successfully',
      description: `Bot "${values.name}" has been configured as a draft.`,
    });
    
    form.reset();
    setIsLoading(false);
    
    if (onSuccess) {
      onSuccess(newBot); 
    }
    
    router.push('/bots'); 
  };

  const handleBack = () => {
    router.push('/bots');
  };

  return {
    form,
    isLoading,
    showToolsSection,
    showSubAgentsSection,
    showAdvancedConfigurations,
    onSubmit: form.handleSubmit(onSubmit),
    handleBack,
  };
};