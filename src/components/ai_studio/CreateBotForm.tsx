'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GUARDRAIL_OPTIONS, AVAILABLE_BOT_TOOLS, AVAILABLE_SUB_AGENTS } from '@/lib/constants';
import { FORM_PLACEHOLDERS, FORM_MESSAGES } from '@/lib/config/form.config';
import { Save, Info, Settings as SettingsIcon } from 'lucide-react';
import { useBotForm } from '@/hooks/useBotForm';
import { FormLabelWithTooltip } from '@/components/shared/FormLabelWithTooltip';
import { YesNoRadioGroup } from '@/components/shared/YesNoRadioGroup';
import { LoadingButton } from '@/components/shared/LoadingButton';
import { BasicInfoSection } from './form-sections/BasicInfoSection';
import { AgentConfigSection } from './form-sections/AgentConfigSection';
import type { BotInstance } from '@/lib/constants';

interface CreateBotFormProps {
  onSuccess?: (newBot: BotInstance) => void; 
}

export function CreateBotForm({ onSuccess }: CreateBotFormProps) {
  const { form, isLoading, showToolsSection, showSubAgentsSection, showAdvancedConfigurations, onSubmit, handleBack } = useBotForm({ onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <BasicInfoSection control={form.control} isLoading={isLoading} />

        <FormField
          control={form.control}
          name="operatingMode"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabelWithTooltip label="Bot Operating Mode" tooltipText="Select the primary operational mode for the bot." />
              <FormControl>
                <div className="grid grid-cols-2 gap-4">
                  {(['rag', 'agentic'] as const).map((mode) => (
                    <label key={mode} className="flex items-center space-x-2 text-sm cursor-pointer border rounded-md p-3 hover:bg-muted/50">
                      <input
                        type="radio"
                        value={mode}
                        checked={field.value === mode}
                        onChange={() => {
                          field.onChange(mode);
                          // Clear agentic mode selections when switching to RAG
                          if (mode === 'rag') {
                            form.setValue('agentRole', 'standalone');
                            form.setValue('selectedTools', []);
                            form.setValue('selectedSubAgents', []);
                          }
                        }}
                        disabled={isLoading}
                        className="form-radio"
                      />
                      <span>{mode === 'rag' ? 'RAG Enabled' : 'Agentic Mode'}</span>
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('operatingMode') === 'agentic' && (
          <FormField
            control={form.control}
            name="agentRole"
            render={({ field }) => (
              <FormItem className="space-y-3 p-4 border rounded-md bg-muted/20">
                <FormLabelWithTooltip label="Agent Role" tooltipText="Define the role of this agent within an agentic system." />
                <FormControl>
                  <div className="space-y-2">
                    {(['standalone', 'supervisor', 'subAgent'] as const).map((role) => (
                      <label key={role} className="flex items-center space-x-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          value={role}
                          checked={field.value === role}
                          onChange={() => {
                          field.onChange(role);
                          // Clear selections when role changes
                          form.setValue('selectedTools', []);
                          form.setValue('selectedSubAgents', []);
                        }}
                          disabled={isLoading}
                          className="form-radio"
                        />
                        <span>
                          {role === 'standalone' && 'Standalone Agent'}
                          {role === 'supervisor' && 'Supervisor Agent'}
                          {role === 'subAgent' && 'Sub-Agent'}
                        </span>
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {showSubAgentsSection && (
          <FormField
            control={form.control}
            name="selectedSubAgents"
            render={() => (
              <FormItem className="space-y-3 p-4 border rounded-md bg-muted/20">
                <FormLabelWithTooltip label="Available Sub-Agents" tooltipText="Select sub-agents this supervisor can delegate tasks to." />
                <ScrollArea className="h-40">
                  <div className="space-y-2">
                    {AVAILABLE_SUB_AGENTS.map((agent) => (
                      <FormField
                        key={agent.id}
                        control={form.control}
                        name="selectedSubAgents"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-2 hover:bg-muted/50">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(agent.id)}
                                  onCheckedChange={(checked) => {
                                    const currentAgents = field.value || [];
                                    return checked
                                      ? field.onChange([...currentAgents, agent.id])
                                      : field.onChange(
                                          currentAgents.filter(
                                            (value) => value !== agent.id
                                          )
                                        );
                                  }}
                                  disabled={isLoading}
                                  id={`agent-${agent.id}`}
                                />
                              </FormControl>
                              <FormLabel htmlFor={`agent-${agent.id}`} className="font-normal flex items-center gap-2 cursor-pointer">
                                <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                                {agent.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </ScrollArea>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {showToolsSection && (
          <FormField
            control={form.control}
            name="selectedTools"
            render={() => (
              <FormItem className="space-y-3 p-4 border rounded-md bg-muted/20">
                <FormLabelWithTooltip label="Available Tools" tooltipText="Select tools this agent can use." />
                <ScrollArea className="h-40">
                  <div className="space-y-2">
                    {AVAILABLE_BOT_TOOLS.map((tool) => (
                      <FormField
                        key={tool.id}
                        control={form.control}
                        name="selectedTools"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-2 hover:bg-muted/50">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(tool.id)}
                                  onCheckedChange={(checked) => {
                                    const currentTools = field.value || [];
                                    return checked
                                      ? field.onChange([...currentTools, tool.id])
                                      : field.onChange(
                                          currentTools.filter(
                                            (value) => value !== tool.id
                                          )
                                        );
                                  }}
                                  disabled={isLoading}
                                  id={`tool-${tool.id}`}
                                />
                              </FormControl>
                              <FormLabel htmlFor={`tool-${tool.id}`} className="font-normal flex items-center gap-2 cursor-pointer">
                                <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                                {tool.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </ScrollArea>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <div>
          <FormLabelWithTooltip label="Guardrails" tooltipText="Content safety filters for bot inputs and outputs." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
            <FormField
              control={form.control}
              name="inputGuardrail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-sidebar-foreground text-form-description">Input Guardrail</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder={FORM_PLACEHOLDERS.GUARDRAIL_NONE} /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GUARDRAIL_OPTIONS.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="outputGuardrail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-sidebar-foreground text-form-description">Output Guardrail</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder={FORM_PLACEHOLDERS.GUARDRAIL_NONE} /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GUARDRAIL_OPTIONS.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>



        <FormField
          control={form.control}
          name="enableAdvancedConfigurations"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabelWithTooltip 
                label="Show Advanced Configurations" 
                tooltipText="Toggle visibility of advanced generation, embedding, and search settings." 
              />
              <FormControl>
                <YesNoRadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoading}
                  yesId="advConfig-yes"
                  noId="advConfig-no"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {showAdvancedConfigurations && (
            <div className="space-y-6 border-t pt-6 mt-6">
                <h3 className="text-lg font-medium text-primary">Advanced Configurations</h3>
                
                <FormField
                  control={form.control}
                  name="enableReRanking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabelWithTooltip label="Re-Ranking" tooltipText="Enable re-ranking of retrieved results for better relevance." />
                        <FormDescription className="text-form-description">
                          If enabled, the bot will re-rank search results for relevance.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="retrievedContextCitation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabelWithTooltip label="Retrieved Context Citation" tooltipText="Enable citation of sources for retrieved context." />
                        <FormDescription className="text-form-description">
                          {FORM_MESSAGES.CITATION_DESCRIPTION}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Accordion type="multiple" className="w-full">
                <AccordionItem value="generation-config">
                    <AccordionTrigger className="text-base font-medium hover:no-underline">
                        <div className="flex items-center gap-1">Generation Config <Info className="h-4 w-4 text-muted-foreground" /></div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4 border rounded-md bg-muted/20">
                    <FormField
                        control={form.control}
                        name="generationConfigTemperature"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabelWithTooltip label="Temperature" tooltipText="Controls randomness. Lower is more deterministic." htmlFor="temperature"/>
                            <FormControl>
                                <Input id="temperature" type="number" step="0.01" min="0" max="1" {...field} disabled={isLoading} 
                                onChange={event => field.onChange(parseFloat(event.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="maxOutputTokens"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabelWithTooltip label="Max Output Tokens" tooltipText="Maximum number of tokens to generate in the response." htmlFor="maxOutputTokens"/>
                            <FormControl>
                                <Input id="maxOutputTokens" type="number" min="1" max="8192" {...field} disabled={isLoading} 
                                onChange={event => field.onChange(parseInt(event.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="topK"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabelWithTooltip label="Top-K" tooltipText="Sample from the K most likely next tokens at each step." htmlFor="topK"/>
                            <FormControl>
                                <Input id="topK" type="number" min="1" max="100" {...field} disabled={isLoading} 
                                onChange={event => field.onChange(parseInt(event.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="topP"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabelWithTooltip label="Top-P" tooltipText="Sample from the smallest set of tokens whose cumulative probability exceeds P." htmlFor="topP"/>
                            <FormControl>
                                <Input id="topP" type="number" step="0.01" min="0" max="1" {...field} disabled={isLoading} 
                                onChange={event => field.onChange(parseFloat(event.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="endSequence"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabelWithTooltip label="End Sequence(s)" tooltipText="Specify sequences that will stop generation. Comma-separate multiple sequences." htmlFor="endSequence"/>
                            <FormControl>
                                <Input id="endSequence" placeholder="e.g., ###, <|endoftext|>" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="embedding-setting">
                    <AccordionTrigger className="text-base font-medium hover:no-underline">
                        <div className="flex items-center gap-1">Embedding Setting <Info className="h-4 w-4 text-muted-foreground" /></div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4 border rounded-md bg-muted/20">
                        <FormField
                            control={form.control}
                            name="embeddingModel"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabelWithTooltip label="Embedding Model" tooltipText="Model used for creating text embeddings." htmlFor="embeddingModel"/>
                                <FormControl>
                                    <Input id="embeddingModel" placeholder={FORM_PLACEHOLDERS.EMBEDDING_MODEL} {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="chunkSize"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabelWithTooltip label="Chunk Size" tooltipText="Size of text chunks for embedding (100 to 2000 tokens)." htmlFor="chunkSize"/>
                                <FormControl>
                                    <Input id="chunkSize" type="number" min="100" max="2000" step="50" {...field} disabled={isLoading} 
                                    onChange={event => field.onChange(parseInt(event.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="chunkOverlap"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabelWithTooltip label="Chunk Overlap" tooltipText="Number of tokens to overlap between chunks (0 to 500 tokens)." htmlFor="chunkOverlap"/>
                                <FormControl>
                                    <Input id="chunkOverlap" type="number" min="0" max="500" step="10" {...field} disabled={isLoading} 
                                    onChange={event => field.onChange(parseInt(event.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                          control={form.control}
                          name="enableDetailedPdfAnalysis"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabelWithTooltip label="Enable Detailed PDF Analysis" tooltipText="If enabled, the PDF will be analyzed in detail over time." />
                                <FormDescription className="text-form-description">
                                  Detailed analysis provides better context extraction.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={isLoading}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="search-setting">
                    <AccordionTrigger className="text-base font-medium hover:no-underline">
                        <div className="flex items-center gap-1">Search Setting <Info className="h-4 w-4 text-muted-foreground" /></div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4 border rounded-md bg-muted/20">

                        <FormField
                            control={form.control}
                            name="maxResults"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabelWithTooltip label="Max Results" tooltipText="Maximum number of search results to retrieve (1 to 50)." htmlFor="maxResults"/>
                                <FormControl>
                                    <Input id="maxResults" type="number" min="1" max="50" {...field} disabled={isLoading} 
                                    onChange={event => field.onChange(parseInt(event.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                          control={form.control}
                          name="consolidateSearchResultsBySource"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabelWithTooltip label="Consolidate Search Results By Source" tooltipText="If enabled, results from the same source will be grouped." />
                                <FormDescription className="text-form-description">
                                  Groups results from the same source for better organization.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={isLoading}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" className="hover:bg-sidebar-primary" onClick={handleBack} disabled={isLoading}>
            Back
          </Button>
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="Submitting..."
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isLoading}
          >
            <Save className="mr-2 h-4 w-4" />
            Submit
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}

export default CreateBotForm;