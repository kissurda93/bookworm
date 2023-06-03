<?php

namespace App\Http\Controllers;

use App\Exceptions\IssueException;
use App\Models\Book;
use App\Models\User;
use App\Models\Issue;
use Illuminate\Http\Response;
use App\Services\IssueService;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\NewIssueRequest;
use App\Http\Requests\IssueUpdateRequest;

class IssueController extends Controller
{
    public function getIssues(): Response
    {
      $issues = Issue::get();
      return response($issues);
    }

    public function createIssue(
      User $user,
      Book $book,
      NewIssueRequest $request,
      IssueService $issueService
      ): RedirectResponse
    {
      $validated = $request->validated();

      try {
        $issueService->createIssue($user, $book, $validated);
      } catch (IssueException $e) {
        return to_route('books')->with('message', [
          'text' => $e->getMessage(),
          'error' => 1,
        ]);
      }

      return to_route('books')->with('message', [
        'text' => 'Issue created successfully. You can pick up the book at the library!',
      ]);
    }

    public function updateIssue(Issue $issue, IssueUpdateRequest $request, IssueService $issueService): RedirectResponse
    {
      $validated = $request->validated();
      $issueService->updateIssue($issue, $validated);
      return to_route('indexPage')->with('message', [
        'text' => 'Issue updated successfully!'
      ]);
    }
}
